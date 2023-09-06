const express = require('express');
const router = express.Router();

const models = require('../models');

router.post('/saveComment', async (req, res) => {
  try {
    const { content, writer, postId } = req.body;

    // Sequelize 모델을 사용하여 Comment를 생성하고 저장
    const comment = await models.Comment.create({
      content,
      writer,
      postId,
    });

    // 저장된 Comment를 조회하고 필요한 연관된 정보를 가져옴
    const result = await models.Comment.findByPk(comment.id, {
      include: [
        {
          model: models.User,
          as: 'user',
        },
        {
          model: models.Board,
          as: 'board',
        },
        {
          model: models.User,
          as: 'respondedToUser',
        },
      ],
    });
    console.log(result);

    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: err.message });
  }
});

module.exports = router;
