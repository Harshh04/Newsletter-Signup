const express = require("express");
const bodyParser = require("body-parser") ;
const request = require("request") ;
const https = request("https") ;
const client = require("@mailchimp/mailchimp_marketing");

const app = express() ;

mailchimp.setConfig({
    //*****************************ENTER YOUR API KEY HERE******************************
     apiKey: "173c117050859b3c363f42dceb92ac4c-us10",
    //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
     server: "us10"
    });

client.setConfig({apiKey: "173c117050859b3c363f42dceb92ac4c-us10",  server: "SERVER",});

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true})) ;

app.listen(3000,function()
{
    console.log("Listening to server 3000") ;
})

app.get("/",function(req,res)
{
    res.sendFile( __dirname+"/signup.html" )
})

app.post("/",function(req,res)

{
    const firstName = req.body.fName ;
    const lastName = req.body.lName ;
    const email = req.body.email ;
    const listId = "abeee26ee0";

    const data ={
        members : [
            {
                email_address : email ,
                status : "subscribed" ,
                merge_fields:{
                    FNAME : firstName ,
                    LNAME : lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data) ;


    const subscribingUser = {
        firstName: firstName,
        lastName: secondName,
        email: email
       };
       //Uploading the data to the server
        async function run() {
       const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
       }
       });
       //If all goes well logging the contact's id
        res.sendFile(__dirname + "/success.html")
        console.log(
       `Successfully added contact as an audience member. The contact's id is ${
        response.id
        }.`
       );
       }
       //Running the function and catching the errors (if any)
       // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
       // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
        run().catch(e => res.sendFile(__dirname + "/failure.html"));

})