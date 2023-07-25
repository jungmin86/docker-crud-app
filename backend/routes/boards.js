const express = require('express');
const router = express.Router();
// const { Board } = require('../models/Board');

const { auth } = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename:  (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const fileFilter = (req, file, cb) => {
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1].toLowerCase();
        // console.log(fileType)
        if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png' || fileType === 'gif') {
            cb(null, true);
        }
        else {cb({msg:'이미지 파일(jpg, jpeg, png, gif)만 업로드 가능합니다.'}, false)}
    } 


const upload = multer({ storage: storage, fileFilter: fileFilter }).single("file");

router.post('/uploadfiles', function(req, res) {
    upload(req, res, err => {
        if(err) {
            console.log(err);
            return res.json({ success: false, err });
        }
        console.log("썸네일 등록 완료")
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post('/thumbnail', (req, res) => {
    let filePath = "";
    filePath = "backend/uploads/" + req.body.fileName;
    return res.json({ success: true, url: filePath });
});


module.exports = router;