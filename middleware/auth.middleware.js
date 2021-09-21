const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message: 'Вы не авторизованы. Пройдите авторизацию заново.-'})
        }
        console.log(config.get('jwt-secret-key'))
        const decodedToken = jwt.verify(token, config.get('jwt-secret-key'))
        console.log(decodedToken)
        req.user = decodedToken
        next()
    }
    catch (e){
        console.log(e)
        return res.status(401).json({message: 'Срок действия токена истек. Пройдите авторизацию заново.'})
    }
}