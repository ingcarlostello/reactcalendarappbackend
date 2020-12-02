const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
                        //* cadena de conexion
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to database')
    }
}

module.exports = {
    dbConnection
}