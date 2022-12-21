var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('Public'))
app.use(bodyParser.urlencoded({
    extended:true
}))


   
mongoose.connect('mongodb+srv://sathish:sathish1234@cluster0.yaokhie.mongodb.net/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
});

var db = mongoose.connection;
db.on('error',()=>console.log('Error in Connecting to Database'));
db.once('open',()=>console.log("connected to db"));
app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var ph = req.body.email;
    var id = req.body.password;
    var email= req.body.password;

    console.log(username);
    var data = {
        "username" : username,
        "email": email,
        "password" : password
     }
     db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
     });
     return res.redirect('home page.html')
})


app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.redirect('index.html');
    }).listen(3000)

console.log("Listening on PORT 3000");


let alert = require('alert');


var db = mongoose.connection;
db.on('error',()=>console.log('Error in Connecting to Database'));
db.once('open',()=>console.log("connected to db"));
app.post("/login",(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    console.log(email);
    db.collection("users").find({}).toArray(function(err, result) {
    if (err) throw err;
    var count = 0;
        for (let i =0; i<result.length; i++){
            console.log(result[i])
            
            if (email == result[i].email && password == result[i].password){
                console.log('Login Successful')
                return res.redirect('home page.html')
            }
            else{
                
                console.log("Invalid");
                alert('Enter valid details...');
                count+=1;
            }
            if(count==result.length){
             res.redirect('/');   
            }
        }

});

app.post("/payment",(req,res)=>{
    var name = req.body.name;
    var id = req.body.id;
    var phone = req.body.phone;
    var email = req.body.email;
    console.log(name);
    var data = {
        "name" : name,
        "id" : id,
        "phone" : phone,
        "email" : email
     }
     db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
     });
     return res.redirect('home page.html')
})
})