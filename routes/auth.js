/*
    Rutas de usuarios / Auth
    host + /api/auth
*/
// forma 1 de requerir
// const express = require('express');
// const router = express.Router()
// forma 2
const {Router} = require('express');
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const { createUser, userLogin, revalidateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

               
router.post(
    '/new', 
    [
        // check es el middleware que validara un campo en particular
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'password is required and 6 characters').isLength({min: 6}),
        validarCampos
    ], // array coleccion de middlewares
    createUser
);

router.post(
    '/',  
    [
        // check es el middleware que validara un campo en particular
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'password is required and 6 characters').isLength({min: 6}),
        validarCampos
    ], // array coleccion de middlewares
    userLogin
);

router.get('/renew', validateJWT, revalidateToken);

// es la forma como se exporta en node
module.exports = router;