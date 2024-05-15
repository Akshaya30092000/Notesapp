const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"akshaya30",
    database:"notesdata"
})

db.connect(err=>{
    if(err) throw err;
    console.log("successfully connected");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/read",(req,res)=>{
    const sqlRead = "select title,content from details";
    db.query(sqlRead,(err,result)=>{
        res.send(result);
    });
});

app.post("/insert",(req,res)=>{
    const sqlInsert = "insert into details (title,content) values (?,?)";
    db.query(sqlInsert,[req.body.title,req.body.content],(err,result)=>{
        res.send("successfully inserted")
    })
});

app.put("/update/:title",(req,res)=>{
    const sqlUpdate = "update details set title=?,content=? where title = ?";
    db.query(sqlUpdate,[req.body.title,req.body.content,req.params.title],(err,result)=>{
        res.send("updated successfully");
    })
});
app.patch("/update/:title",(req,res)=>{
    const sqlUpdate = "update details set content=? where title = ?";
    db.query(sqlUpdate,[req.body.content,req.params.title],(err,result)=>{
        res.send("content updated successfully");
    })
});



app.delete("/delete/:title",(req,res)=>{
    const sqlDelete = "delete from details where title = ?";
    db.query(sqlDelete,[req.params.title],(err,result)=>{
        res.send("deleted successfully");
    })
});



app.post("/insert",(req,res)=>{
    const sqlInsert = "insert into employee (name,age) values (?,?)";
    db.query(sqlInsert,[req.body.name,req.body.age],(err,result)=>{
        res.send("successfully inserted")
    })
});







app.listen(port,()=>{
    console.log("successfully connected to the port");
})