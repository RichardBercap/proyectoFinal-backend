const express = require('express');
const router = express.Router();
const {  login, registrar } = require('./../controllers/authController');


router.post('/registro',registrar);
router.post('/login',login);

module.exports = router;