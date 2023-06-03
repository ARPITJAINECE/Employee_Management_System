const mysql=require("mysql");

//create connection
var mysqlconnection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root123',
    database:'test',
    port:'3306'
});

//connecting to the mysql with help of above created connection
mysqlconnection.connect(function(err){
    if(err){
        console.log("connection is failed!!!!"+JSON.stringify(err));
    }else{
        console.log("connection established successfully!!!!");
    }
});

//exporting the mysql connection to be used in routers.js
module.exports=mysqlconnection;