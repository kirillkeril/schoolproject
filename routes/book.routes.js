const {Router, json} = require('express')
const {check, validationResult} = require('express-validator')
const config = require('config')
const Book = require('../models/book')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

router.post('/',async (req, res)=>{
    try{
        const {direction} = req.body
        let books
        if(direction){
            books = await Book.find({direction: direction})
        }
        else{
            books = await Book.find()
        }
        res.json(books)
    }
    catch (e){
        res.status(500).json({message: 'Серверная ошибка'})
    }
})

router.post('/create',
    [
        check('title', 'Введите Название книги').isLength({min: 1}),
        check('author', "Укажите автора (если отсутствует - нет)").isLength({min: 1}),
        check('description', 'Введите описание').isLength({min: 10}),
        check('time', 'Проверьте соответствие с форматом').matches(/[0-9]+ (д)[а-я]?[а-я]+/gm),
        check('genre', 'Введите жанр').isLength({min: 1}),
        check('direction', 'Выберите направление').isLength({min: 1})
    ], authMiddleware,
    async (req, res)=>{
        try{
            const errors = validationResult(req)
            const {title, author, description, time, genre, direction} = req.body

            if(!errors.isEmpty()){
                return res.status(400).json({message: errors.array()})
            }
            const owner = await User.findById(req.user.id)
            const creatableBook = await new Book({title, author, description, time, genre, direction, owner})
            await creatableBook.save()
            return res.status(201).json({message: "Книга добавлена"})
        }
        catch (e){
            res.status(500).json({errors: e})
        }
})

router.get('/:id', async (req, res)=>{
    try{
        const book = await Book.findById(req.params.id)
        res.json(book)
    }
    catch (e){
        res.status(500).json({message: 'Серверная ошибка'})
    }
})

module.exports = router