
import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

router.post('/', (req, res) => {
  
  let data = req.body
  let smtpTransport = nodemailer.createTransport({
   host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3c5ba5ebf2ae1c",
    pass: "0bfb5c78faa3d5"
  }
  
});
   

  smtpTransport.verify((error) => {
    if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

  //Note: to check the e-post you need to browse
  //https://mailtrap.io/
  //Login with usertest_12@outlook.com
  //password: booking1234

 let mailOptions = {
    from: 'bookingtest_12@outlook.com',
    to: 'usertest_12@outlook.com',  //password: booking1234!
    subject: `Bokningsnummer: ${data.bookingNumber}`,
    html: `
    
    <h3>Tack för din bokning!</h3>
    <hr>
      <ul>
      <li> Bokningsnummer: ${data.bookingNumber} </li>
      <li> Bokad av: ${data.firstName} ${data.lastName} </li>
      <li> E-post: ${data.email} </li>
      </ul>
      <br />

      <h3>Din resa</h3>
      <hr>
      <ul>
      <li> Från: ${data.fromLocation} – Till: ${data.toLocation}</li>
      <li> Avgår: ${data.departureDate} ${data.departureTime} </li>
      <li> Avgår: ${data.arrivalDate} ${data.arrivalTime} </li>
      ${data.arrivalDate} ${data.arrivalTime}  
      <!--<li> ${data.firstName} ${data.lastName}, ${data.passengerType} </li>-->
      <li> ${data.ticketClass}, ${data.passengerType} </li>
      </ul>
      <br />

      <h3>Ditt kvitto</h3>
      <hr>
      <ul>
      <li> Datum: ${data.currentDate} </li>
      <li> Orgnr: 1636456732 </li>
      </ul>
      <h4 style = "text-align:right;"> Att betala: ${data.price} SEK</h4>
      <br />

      <h3>Betalning</h3>
      <hr>
      <ul>
      <li> Att betala: ${data.price} SEK</li>
      </ul>
      <ul>
      <li> <a href="${data.paymentLink}" target="_blank">Länk till betalning (ej implementerad).<a></li>
      </ul>
      <hr>
    `
  };

 
  smtpTransport.sendMail(mailOptions, (error) => {
  
    if (error) {
      res.send(error)
    }
    else {
      res.send('Email Sent')
      console.log('Success');
    }
  })
  
  //smtpTransport.close();

}); 


export default router;
