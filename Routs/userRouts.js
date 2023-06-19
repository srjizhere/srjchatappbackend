const express = require('express');
const {registerUser,authuser, allUsers} = require('../controllers/userControllers');
const { protect} = require('../middelware/authmiddelware')
const router = express.Router()
router.route('/').post(registerUser).get(protect,allUsers);
router.post('/login',authuser)



module.exports = router; 