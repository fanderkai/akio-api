const Letter = require('../models/letter.model.js');

const letterUpload = async(req, res) => {
    console.log(req.file);
    try{
        res.send({ status: 'success', message: `${req.file.original_name} uploaded!` });
    }catch(err){
        res.send({ status: 'error', message: err.message });
    }
}
module.exports = {letterUpload};