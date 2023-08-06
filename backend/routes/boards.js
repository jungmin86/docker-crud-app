const express = require('express');
const router = express.Router();
const models = require('../models');

const { auth } = require('../middleware/auth');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads/')
    },
    filename: function(req,file,cb){
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
        console.log("썸네일 등록 완료", req.file.path);
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post('/thumbnail', (req, res) => {
    let filePath = "uploads/" + req.body.fileName;
    return res.json({ success: true, url: filePath });
});

router.post('/uploadBoard', (req, res) => {
    const { writer, title, description, privacy, filePath, category, thumbnail } = req.body;
    models.Board.create({
        writer,
        title,
        description,
        privacy,
        filePath,
        category,
        views: 0, // Set default views to 0
        // thumbnail: thumbnail===filePath? null : thumbnail 
        thumbnail
      })
      .then( response => {
        return res.status(200).json({ success : true });
    })
    .catch(err => {
        return res.json({ success: false, err });
    }) 
});

router.get('/getBoards', (req, res) => {
    models.Board.findAll({
      include: [
        {
          model: models.User,
          as: 'user', // Use the alias 'boards' to specify the association
          attributes: ['id', 'name', 'lastname', 'email'],
        },
      ],
    })
      .then((boards) => {

        res.status(200).json({ success: true, boards });
      })
      .catch((err) => {
        console.error(err);
        return res.status(400).send(err);
      });
  });
  
router.post('/getBoardDetail', (req, res) => {
    models.Board.findOne({
        where: { id: req.body.boardId },
        include: [{ model: models.User, as: 'user', attributes: ['id', 'name', 'lastname', 'email'] }]
    })
    .then((board) => {
        console.log("우영창", board);
        if (!board) {
            return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
          }
        res.status(200).json({ success: true, board });
      })
      .catch((err) => {
        console.error(err);
        return res.status(400).send(err);
      });
    });
//     try {
//         const board =  models.Board.findOne({
//           where: { id: req.body.boardId },
//           include: [{ model: models.User, as: 'user', attributes: ['id', 'name', 'lastname', 'email'] }]
//         });
//         console.log("ㅇㅇㅇㅇㅇㅇ:", board);
//         if (!board) {
//           return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
//         }
    
//         res.status(200).json({ success: true, board });
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: '서버 에러 발생' });
//       }
// });
    
  
module.exports = router;
  


