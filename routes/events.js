const {Router} = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/events');
const { validateJWT } = require('../middlewares/validate-jwt');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {isDate} = require('../helpers/isDate');
// const { createUser, userLogin, revalidateToken } = require('../controllers/auth');
const router = Router();



//! forma 1 de validar middleware de JWT
// todas las peticiones pasan por este middleware de JWT
router.use(validateJWT)

router.get('/', getEvents);
router.post(
    '/', 
    [
        check('title', 'title is mandatory').not().isEmpty(),
        check('start', 'Start date is mandatory').custom(isDate),
        check('end', 'End date is mandatory').custom(isDate),
        validarCampos
    ], 
    createEvent
);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

//! forma 2 de validar middleware de JWT
// router.get('/', validateJWT, getEvents);
// router.post('/', validateJWT, createEvent);
// router.put('/:id', validateJWT, updateEvent);
// router.delete('/:id', validateJWT, deleteEvent);

module.exports = router;
