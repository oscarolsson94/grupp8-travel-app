
import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

router.post('/', (req, res) => {
  
  let data = req.body
  let smtpTransport = nodemailer.createTransport({
    Server: "smtp.office365.com",
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    auth: {
      user: 'bookingtest_12@outlook.com',
      pass: 'booking1234!'
  },
  tls: {
        ciphers:'SSLv3'
    },
    logger: true,
    debug: true
});
   

  smtpTransport.verify((error) => {
    if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

 let mailOptions = {
    from: 'bookingtest_12@outlook.com',
    to: 'usertest_12@outlook.com',  //password: booking1234!
    subject: `Bokningsnummer: xxxxxxx`,
    html: `
    
    <h3>Tack för din bokning!</h3>
    <hr>
      <ul>
      <li> Bokningsnummer: xxxxxx </li>
      <li> Bokad av ${data.firstName} ${data.lastName} </li>
      <li> E-post: ${data.email} </li>
      </ul>
      <br />

      <h3>Din resa</h3>
      <hr>
      <ul>
      <li> Från: ${data.fromLocation} – Till: ${data.toLocation} </li>
      <li> Avgår: ${data.departureDate} ${data.departureTime}  
      Framme: ${data.arrivalDate} ${data.arrivalTime}  </li>
      <li> ${data.firstName} ${data.lastName}, ${data.passengerType} </li>
      </ul>
      <br />

      <h3>Ditt kvitto</h3>
      <hr>
      <ul>
      <li> Datum: ${data.currentDate} </li>
      <li> Orgnr: xxxxxxxxxxx </li>
      </ul>
      <h4 style = "text-align:right;"> Att betala ${data.price} SEK</h4>
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
