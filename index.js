var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({

        extended:true
}))

//connect the database
mongoose.connect('mongodb://Localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true

});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in connecting to Database"));
db.once('open',()=>console.log("connected to Database"))

app.post("/register",(req,res)=>{
    var First_name = req.body.First_name;
    var Last_name = req.body.Last_name;
    var Address = req.body.Address;
    var Email =  req.body.Email;
    var Postal_code = req.body.Postal_code;
    var Mobile_number = req.body.Mobile_number;
    var Gender = req.body.Gender;
    var user_name = req.body.user_name;
    var password = req.body.password;
    var profile_image = req.body.profile_image

    var data = {
        "First_name" : First_name,
        "Last_name" : Last_name,
        "Address" :  Address,
        "Email" :  Email,
        "Postal_code" : Postal_code,
        "Mobile_number" : Mobile_number,
        "Gender" : Gender,
        "user_name" : user_name,
        "password" : password,
        "profile_image" : profile_image   
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;

        }
        console.log("Record inserted successfully");
    });
    return res.redirect('home.html')
})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-ALLow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on PORT 3000");