const express = require('express'); 
const router = express.Router(); 
const File = require('../models/file');


router.get('/files/download/:uuid' , async(req , res)=>{
    const uid = (req.params.uuid); 

    const file = await File.findOne({uuid : uid})
    if(!file){
        return res.render('download' , {
            error : 'Link has been expired Upload a file and create a new link'
        })
    }
    const filePath = `${__dirname}/../${file.path}` ; 
    res.download(filePath) ; 
})

module.exports = router ; 
