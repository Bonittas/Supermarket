const express = require('express');
const { signIn, signUp } = require('../controllers/user.controller.js');

const router = express.Router()

router.post( '/signUp', signUp)
router.post( '/signIn', signIn)

module.exports = router