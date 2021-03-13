const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid')

const multerOptions = {
    storage:multer.memoryStorage(),
    fileFilter:(req, file, next) =>{
        const allowed = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
        if(allowed.includes(file.mimetype)){
            next(null, true);
        } else {
            next({message:'Arquivo não suportado'}, false);
        }
    }
}

exports.upload = multer(multerOptions).single('photo');


exports.resize = async (req, res, next) =>{
    if(!req.file){
        next();
        return;
    }

    const ext = req.file.mimetype.split('/')[1]

    let fileName = `${uuid.v4()}.${ext}`

    req.body.photo = fileName;


    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/upload/${fileName}`)

    next();

}