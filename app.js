const express = require("express")
path = require("path");
const fs = require("fs");
const app = express();
//use body-parser
const bodyparser=require("body-parser");
//mongoose start
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/danceweb', {useNewUrlParser: 
true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var contactSchema = new mongoose.Schema({
    name: String,
    gender:String,
    age: String,
    phone: String,
    email:String,
    address: String
  });
var contact = mongoose.model("contact", contactSchema);


const port = 80;
app.use("/static", express.static("static"));
app.use(bodyparser());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');// set the view engine
// set the view directory
app.set("views", path.join(__dirname, "views"))

//ENDPOINTS
app.get("/", (req, res) => {
    res.status(200).render('./home.pug'
        , { title: "hey", "content": "this is best content" })
})
app.get("/contact",(req,res) =>{
    res.status(200).render("./contact.pug")
})
app.post("/contact",(req,res) =>{
    var myData = new contact(req.body)
    //console.log(req.body)
    myData.save().then(()=>{
    res.send(" this item has been saved to the database")
}).catch(()=>{
    res.status(400).send("has not saved to database")
    })

})

app.listen(port, () => {
    console.log(`the application started successfully on port ${port}`);

})

