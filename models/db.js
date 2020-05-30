const mongoose = require("mongoose");

const url ="mongodb://heroku_lz2jfff7:c2jaagajoves3ci2o5sjjmtvrt@ds135456.mlab.com:35456/heroku_lz2jfff7";

//connect to db

mongoose.connect(url,{
   useNewUrlParser:true,
   useUnifiedTopology:true,
   useFindAndModify:true
},(err)=>{
if(!err){
    console.log("mongodb connected successfully");
}else{
    console.log("error in connection ." + err);
}
});

//include the employee model

require('./user');
require('./leaseagreement');