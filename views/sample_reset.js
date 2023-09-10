const Sib=require('sib-api-v3-sdk')
require('dotenv').config()
const client=Sib.ApiClient.instance
const apikey=client.authentications['api-key']
apikey.apiKey=process.env.API_KEY
const tranEmail_Api=new Sib.TransactionalEmailsApi()
const sender=
{
    email:'mindhifiras@gmail.com',
}
const receiver=[{
    email:'mindhizaid62@gmail.com',
},
]
tranEmail_Api.sendTransacEmail({
    sender,
    to:receiver,
    subject:'testing',
    "htmlContent":"<html><head></head><body><h2>Hello,</h2><h3>This is my first transactional email sent from Brevo.</h3></body></html>"
}).then(console.log).catch(console.log)