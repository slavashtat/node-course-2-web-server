const express = require("express");
const hbs = require("hbs");
const fs = require ("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine","hbs");

//////////////////////////////
// Midleware section
//////////////////////////////
app.use( (req,res,next) =>
{
 var now = new Date().toString();


 var log = `${now}: ${req.method}: ${req.url}`;
 console.log(log);
 fs.appendFile("server.log",log+ "\n",(err)=>{
  if(err)
  {
   console.log("Unable to append to server log");
  }
 });

 next();
});

/*
app.use( (req,res,next) =>
{
 res.render("maintenance.hbs");
});
*/

app.use(express.static(__dirname+"/public"));
//////////////////////////////


//////////////////////////////
// Helpers setion
//////////////////////////////
hbs.registerHelper("getCurentYear", () => {
 return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
 return text.toUpperCase();
});
//////////////////////////////


/*
app.get('/', (req,res) => {
//res.send("<h1> Hi Express </h1> ");
 res.render("home.hbs",{
  pageTitile: "Home page",
  welcomeMessage: "Kuku",
  currentYear: new Date().getFullYear()
});
});
*/

//////////////////////////////
// Express section
//////////////////////////////
app.get('/', (req,res) => {
//res.send("<h1> Hi Express </h1> ");
 res.render("home.hbs",{
 pageTitile: "Home page",
 welcomeMessage: "Kuku"
});
});


app.get('/JSON', (req,res) => {
//res.send("<h1> Hi Express </h1> ");
 res.send({
  name: "Andrew",
  likes: ["Biking","Cities"]

});
});

app.get('/about',(req,res) =>{
 res.render("about.hbs",{
 pageTitle: "About Page"
 });
});

app.get('/fail',(req,res) =>{
 res.send({
  error_code:101,
  error_message: "some problem"
});
});


app.listen(3000,()=>{
 console.log("server is up on port 3000")
});

//////////////////////////////
