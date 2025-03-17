const router = require('express').Router() ; 
const multer = require('multer') ; 
const path = require('path') ; 
const File = require('../models/file') ; 
const {v4:uuid4} = require('uuid') ; 
const {sendMail} = require('../services/emailService')


let storage = multer.diskStorage({
    destination : (req , file , cb) => cb(null , 'uploads/') , 
    filename : (req , file , cb)=>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;  // unique file generation
        cb(null , uniqueName) ; 
    }
})

let upload = multer({
    storage : storage ,    // or storage -->>>  only we can write 
    limit : {fileSize : 1000000 * 100}
}).single('myfile') ;

router.post('/files' , (req ,res)=>{
    console.log(req.file) ; 
  
     upload(req , res , async(err)=>{
            
            console.log(req.file) ; 
             
            if(!req.file)
            {
                return res.status(400).json({
                    error : "All fields are required"
                })
            }

            if(err){
                return res.status(500).send({
                    error : err.message
                })
            }

        // store in the db :

        const file = new File({
            filename : req.file.filename , 
            uuid : uuid4() , 
            path : req.file.path , 
            size : req.file.size , 

        }) ; 
        
        const response = await file.save() ; 
   
        return res.json({
           file : `${process.env.APP_BASE_URL}/files/${response.uuid}`
        })
    

   })

})


router.post('/send' , async(req , res)=>{


   

    const {uuid , emailTo , emailFrom} = req.body ; 

    // validate request : 
    if(!uuid || !emailTo || !emailFrom){
        res.status(422).send({error : 'All fields are required'}) ; 
    }

    console.log('hello from the api/files/send') ; 
    // Get Data from the datebase : 
    const file = await File.findOne({uuid : uuid}) ; 
    if(file.sender == emailTo){
        return res.status(422).send({error : 'Email already sent.'}) ; 
    }
    file.sender = emailFrom ; 
    file.receiver = emailTo ; 

    const response = await file.save() ; 
    
    // send email : 
    sendMail({
        from : emailFrom , 
        to:emailTo , 
        subject: 'inShare file sharing' , 
        text:`${emailFrom} shared a file with you.Please visit the following link to download it  ${process.env.APP_BASE_URL}/files/${file.uuid}` , 
    })


   

}) ;


module.exports = router ; 




/*

html : require('../services/emailTemplate')({
            emailFrom : emailFrom , 
             
            size : parseInt(file.size/1000) + 'KB' ,
            expire : '24 hours'

        })





*/
