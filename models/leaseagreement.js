const mongoose = require('mongoose');

const leaseAgreementSchema = new mongoose.Schema({
    agreementDate:{
        type:Date,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    street:{
        type:String
    },
    state:{
        type:String,
        required:true
    },
    agreementNo:{
        type:String
    },
    postCode:{
        type:String
    },
    phone:{
        type:String
    },
    furnitureName:{
        type:String
    },
    Quantity:{
        type:String
    },
    carParking:{
        type:String
    },
    totalMonthlyRate:{
        type:String
    },
    securityDeposit:{
        type:String
    },
    carParking:{
        type:String
    }
});

module.exports= mongoose.model('LeaseAgreement',leaseAgreementSchema);