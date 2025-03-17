const express = require('express'); 
const router = express.Router(); 
const File = require('../models/file');

router.get('/:uuid', async (req, res) => {
    try {
        const uuid = req.params.uuid;
        
        
        const file = await File.findOne({ uuid: uuid });

        console.log(file);

        if (!file) {
            return res.render('download', { error: 'Link has expired!' });
        }

        return res.render('download', {
            uuid: file.uuid, 
            fileName: file.filename, 
            fileSize: file.size, 
            downloadLink: `${process.env.APP_BASE_URL}/user-file/files/download/${file.uuid}`
        });

    } catch (err) {
        res.render('download', { error: 'Something went wrong' });
    }
});

module.exports = router;
