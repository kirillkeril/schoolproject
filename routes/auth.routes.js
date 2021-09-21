const {Router} = require('express')
const User = require('../models/User')
const Role = require('../models/Role')
const config = require('config')
const jwt = require("jsonwebtoken")
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const router = Router()

router.post('/reg',
    [
        check('email', 'Введите корректный Email').isEmail(),
        check("password", 'Длина пароля должна быть больше 8 символов').isLength({min:8})
    ],
    async (req, res)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message: errors.array()})
        }
        const {email, password} = req.body

        const candidate = await User.findOne({email})
        if(candidate){
            return res.status(400).json({message: 'Пользователь уже существует'})
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        const userRole = await Role.findOne({value: 'USER'})

        const user = new User({email: email, password: hashedPassword, role: userRole.value})
        await user.save()
        return res.status(201).json({message: "Пользователь создан"})
    }
    catch (e) {
        res.status(500).json({errors: e})
        console.log(e)
    }
})

router.post('/log', [
        check('email', 'Введите корректный Email').normalizeEmail().isEmail(),
        check("password", 'Введите пароль').isLength({min: 1})
    ],
    async (req, res)=>{
    try {
        const errorMsg = "Ошибка при входе: неверный логин или пароль"
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message: errors.array()})
        }

        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: errorMsg})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: errorMsg})
        }

        const token = jwt.sign(
            {id: user.id, role: user.role},
            config.get('jwt-secret-key'),
            {expiresIn: '24h'}
        )
        res.json({token: token, id: user.id, role: user.role})
    }
    catch (e) {
        res.status(500).json({errors: e})
    }
})

module.exports = router