const express = require('express');
const router = express.Router();
const controller = require('../controllers/comentarios.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, controller.criar);
router.get('/', auth, controller.listar);
router.get('/me', auth, controller.listarMe);
router.put('/:id', auth, controller.editar);
router.delete('/:id', auth, controller.deletar);

module.exports = router;
