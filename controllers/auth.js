const bcrypt = require('bcryptjs');
const express = require('express');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/User');



                                //! esto permite activar el intelisense en este modulo
const createUser = async (req, res = express.response) => {
    try {
        console.log(req.body);
        const {email, password} = req.body;
        let user = await User.findOne({email: email});
        
        if(user){
            return res.status(400).json({
                ok: false,
                msg: "Error creating user, email already exists."
            })
        }
        user = new User(req.body);
        // encriptar contraseña
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt);
        //grabar en BD
        await user.save(); // .save es una promesa por lo cual se usa async

        // generate JWT
        const token = await generateJWT(user.id, user.name);

        // status 201 es el que se regresa cuando se graba informacion correctamnete
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token

        });        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error creating user, email already exists."
        });
    }
};

const userLogin = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email: email});

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: "User does not exist"
            });
        }

        // confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password)

        // si el password NO es valido
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong password'
            })
        }

        // generar JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Internal server error"
        });
    }
}

const revalidateToken = async (req, res) => {

    // const uid = req.uid
    // const name = req.name
        const {uid, name} = req;
     // generar JWT
     const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        // uid,
        // name,
        token
    })
}

module.exports = {
    //forma 1
    // createUser: createUser
    // forma 2
    createUser,
    revalidateToken,
    userLogin
};