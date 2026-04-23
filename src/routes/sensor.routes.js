const express = require('express');
const router = express.Router();

const controller = require('../controllers/sensor.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, controller.cadastrar);

router.get('/', auth, controller.listar);

router.get('/ultimo', auth, controller.ultimo);

module.exports = router;