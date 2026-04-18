const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

router.post('/login', controller.login);
router.post('/cadastrar', controller.cadastrar);

module.exports = router;