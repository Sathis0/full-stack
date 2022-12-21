var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('Public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://sathish:sathish1234@cluster0.yaokhie.mongodb.net/mydb');

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;

    var data = {
        "username": username,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('project.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Access-control-Allow-Origin": '*'
    })
    return res.redirect('sign.html');
}).listen(3000);

console.log("Listening on PORT 3000");