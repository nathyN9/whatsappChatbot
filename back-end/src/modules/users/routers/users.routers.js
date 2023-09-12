const express =require('express')
const users = require('../services/user.service')

const router = express.Router()

router.get('/all', users.getAllUsers);
router.get('/byid/:id', users.getById);
router.post('/create', users.createUser);
router.get('/authUser/:id', users.authUser);
router.put('/update', users.updateUser);
app.use('/questions', questions);

module.exports = router