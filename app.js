const express = require("express");//module 1 for get post request and for server
const bodyParser = require("body-parser");//module 2 for allowd data from html files
const request   = require("request");//module 3 for send request to server
const https   = require("https"); //module 4 used for send request for one server to another server
var app = express();//object used for  use get and post method

app.use(bodyParser.urlencoded({extende:true})); //allows to
app.use(express.static("public"));
app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
    const firtstName =  req.body.fname;
    const lastName   =  req.body.lname;
    const emailid    =  req.body.emails;
    console.log(firtstName,lastName,emailid);
    var data = {
            members: [{
                 email_address:emailid,
                 status:"subscribed",
                 merge_fields:{
                      FNAME:firtstName,
                      LNAME:lastName
                 }
            }]
         };
    var jasonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/5d04aa8cda"
    const option = {
        method:"post",
        auth:"mosamshah:f9e7094fdf1dacf405af3c0bac09c4e8-us10"

    }

    const reqest = https.request(url,option,function(response){
             response.on("data",function(data){
                     console.log(JSON.parse(data));
                     console.log(response.statusCode);
                     if(response.statusCode === 200)
                          {

                            res.sendFile(__dirname+"/success.html");
                          }
                       else{
                            res.sendFile(__dirname+"/failure.html");
                      }
             })
    })
    reqest.write(jasonData);
    reqest.end();

 })

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
})
//api key:f9e7094fdf1dacf405af3c0bac09c4e8-us10

//unique // ID: 5d04aa8cda
