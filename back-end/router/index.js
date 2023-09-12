const express =require('express')
const users = require('../src/modules/users/routers/users.routers')

const routers =(app)=>{
    const baseRoute = express.Router()
    app.use(express.static('public'))
    app.use('/api/v1', baseRoute)
    baseRoute.use('/users', users)
    
}

module.exports = routers