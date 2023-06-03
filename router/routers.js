const express = require("express");
const router = express.Router();
const connection = require("../db/dbconnect");

//to  find all the employees
router.get("/employees", function (req, resp) {
    connection.query("select * from employee", function (err, data, fields) {

        //if data is not found the err
        if (err) {
            resp.status(500).send("no data is found!!!" + JSON.stringify(err));
        } else {

            //data is found then send it to first ejs and then to client's browser
            resp.render("index", { empdata: data });//{ empdata: data }: It is an object containing data that will be passed to the template for dynamic content generation. empdata is the key, and data is the value. You can access this data in the template file using the key empdata.
        }
    })
});

//to add data in the form
router.get("/displayaddform", function (req, resp) {
    resp.render("addemp")
});

//to insert the new employee in the database
router.post("/insertEmployee", function (req, resp) {
    var empid = req.body.empid;
    var ename = req.body.ename;
    var sal = req.body.sal;
    connection.query("insert into employee values(?,?,?)", [empid, ename, sal], function (err, data) {
        if (err) {
            resp.status(500).send("data not added" + JSON.stringify(err));
        } else {
            resp.redirect("/employees");
        }
    });
});

//to update previous data of one employee
//two steps: i)retrieve data and display it in a form
//           ii)update data and go back to /employees
//step (i)
router.get("/edit/:eid", function (req, resp) {
    console.log("empid", req.params.eid);
    connection.query("select * from employee where empid=?", [req.params.eid], function (err, data, fields) {
        console.log(data);
        if (err) {
            resp.status(500).send("data not found" + JSON.stringify(err));
        } else {
            resp.render("updateemp", { emp: data[0] });
        }
    });
});
//step(ii)
router.post("/updateEmployee", function (req, resp) {
    var empid = req.body.empid;
    var ename = req.body.ename;
    var sal = req.body.sal;
    connection.query("update employee set ename=? , sal=? where empid=?", [ename, sal, empid], function (err, result) {
        if (err) {
            resp.status(500).send("data not updated" + JSON.stringify(err));
        } else {
            resp.redirect("/employees");
        }
    });
});

//for delete
router.get("/delete/:eid", function (req, resp) {
    connection.query("delete from employee where empid=?", [req.params.eid], function (err, result) {
        if (err) {
            resp.status(500).send("data not deleted" + JSON.stringify(err));
        } else {
            resp.redirect("/employees");
        }
    });
});

//export router to use it in app.js
module.exports = router;