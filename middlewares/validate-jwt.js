const {response} = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    const token = req.header('x-token') // este header es el que se pone en postman en la seccion headers

        // si token no existe
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'There is no token'
        });
    }

    try {
        //const payload = jwt.verify(
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        // console.log(payload);
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }

    next();
}

module.exports = {
    validateJWT
}