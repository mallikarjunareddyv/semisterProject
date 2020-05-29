const mongoose = require("mongoose");

const url ="mongodb://localhost:27017/EmployeeDB";

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