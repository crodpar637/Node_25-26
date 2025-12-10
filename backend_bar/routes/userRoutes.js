// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {verifyToken} = require('../middlewares/authMiddleware');


router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/logout', userController.logout);
router.get('/', userController.getAllUsers);
// router.get('/', platoController.getAllPlato);
// router.get('/:idplato', platoController.getPlatoById);
// router.post('/', platoController.createPlato);
// router.delete('/:idplato', platoController.deletePlato);
// router.put('/:idplato', platoController.updatePlato);


module.exports = router;
