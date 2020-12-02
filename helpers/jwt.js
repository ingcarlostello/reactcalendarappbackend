// JWT es una libreria que trabaja con callbacks, no trabaja con promesas
const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
    return new Promise ((resolve, reject) => {
        const payload = {uid, name}

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('The token could not be generated.')
            }
            else{
                resolve(token)
            }
        })
    })
}

module.exports={
    generateJWT
}