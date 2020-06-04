const mongoose = require('mongoose');

const leaseAgreementSchema = new mongoose.Schema({
    
    fullName:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    street:{
        type:String
    },
    zip:{
        type:String
    },
    state:{
        type:String
    },
    cardname:{
        type:String
    },
    cardnumber:{
        type:String
    },
    expmonth:{
        type:String
    },
    expyear:{
        type:String
    },
    cvv:{
        type:String
    }
});

module.exports= mongoose.model('Agreement',leaseAgreementSchema);