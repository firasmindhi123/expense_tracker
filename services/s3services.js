const AWS=require('aws-sdk')
require('dotenv').config();
exports.uplodtoS3=(data,filename)=>
{
     const BUCKET_NAME='fd12'
     const IAM_USER_KEY=process.env.AWS_ACCESS_KEY_ID
     const IAM_USER_SECRET=process.env.AWS_SECRET_ACCESS_KEY
     let S3bucket=new AWS.S3({
         accessKeyId:IAM_USER_KEY,
         secretAccessKey:IAM_USER_SECRET
     })

         var params={
             Bucket:BUCKET_NAME,
             Key:filename,
             Body:data,
             ACL:'public-read'
         }
         return new Promise((resolve,reject)=>{
          S3bucket.upload(params,(err,S3response)=>{
            if(err)
            {
                console.log("something went wrong")
                reject(err)
            }
            else{
                console.log("success")
                resolve(S3response.Location)
            }
        })

         })
         
     
}