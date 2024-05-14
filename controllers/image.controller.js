const imageUpload = async(req, res) => {
    console.log(req.file);
    try{
        res.send({ status: 'success', message: `${req.file.originalname} uploaded!` });
    }catch(err){
        res.send({ status: 'error', message: err.message });
    }
}
module.exports = {imageUpload};