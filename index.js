const express=require("express");
const app=express();
const port=5000;
const nodemailer=require("nodemailer");
app.use(express.urlencoded({extended:true}));
app.post("/smtp-connect",async(req,res)=>{
    console.log("sending mail");
    const fname=req.body.fname;
    const lname=req.body.lname;
    const emailId=req.body.email;
    const address=req.body.address;
    console.log(emailId);
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f812a099a0dcce",
          pass: "b4a770356b7ee4"
        }
      });
      let mailOptions = {
        from: "cj199@email.com", // sender address
        to: emailId, // list of receivers
        subject: 'Hello Your Address is changed', // Subject line
        text: address, // plain text body
        html:"<b>Updated</b>"
        
    };
    const info=transport.sendMail(mailOptions,(error,info)=>{
        if(error){
           return console.log("an error happened");
        }
            console.log("Massage sent to: "+ info.messageId);
    });
});
app.get("/home" ,(req,res)=>{
    res.sendFile("mailsending-app.html",{root:__dirname});
});

app.listen(port,()=>{
    console.log(`port is running on ${port}`);
} );