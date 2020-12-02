const moment = require('moment');                      
                        // esto viene de express validator - ver documentacion
const isDate = (value) => {
    if(!value){
        return false
    }

    const fecha = moment(value);

    if(fecha.isValid){
        return true
    }else{
        return false
    }
}

module.exports = {
    isDate
};