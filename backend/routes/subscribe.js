const express = require('express');
const router = express.Router();

const models = require('../models');

router.post('/subscribeNumber', async (req, res) => {
    try {
      const subscribeNumber = await models.Subscriber.count({
        where: { userTo: req.body.userTo },
      });
  
      return res.status(200).json({ success: true, subscribeNumber });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: '구독자 수를 가져오는 중에 오류가 발생했습니다.' });
    }
  });

router.post('/subscribed', async (req, res) => {
    try {
        const userTo = req.body.userTo;
        const userFrom = req.body.userFrom;

        const subscribe = await models.Subscriber.findOne({
            where: { userTo, userFrom }
        });

        if (subscribe) {
            res.status(200).json({ success: true, subscribed: true });
        } else {
            res.status(200).json({ success: true, subscribed: false });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.post('/unSubscribe', async (req, res) => {
    try {
        const userTo = req.body.userTo;
        const userFrom = req.body.userFrom;
    
        const deletedSubscriber = await models.Subscriber.destroy({
          where: { userTo, userFrom },
        });
    
        if (deletedSubscriber) { //지워진 게 있으면 (삭제 된 레코드의 수가 반환됨)
          res.status(200).json({ success: true });
        } else {
          res.status(400).json({ success: false, message: '구독 취소에 실패했습니다.' });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: '구독 취소 중에 오류가 발생했습니다.' });
      }
});
router.post('/subscribe', async (req, res) => {
    try {
        const userTo = req.body.userTo;
        const userFrom = req.body.userFrom;
    
        const subscriber = await models.Subscriber.create({
          userTo,
          userFrom,
        });
    
        if (subscriber) {
          res.status(200).json({ success: true });
        } else {
          res.status(400).json({ success: false, message: '구독에 실패했습니다.' });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: '구독 중에 오류가 발생했습니다.' });
      }

});
  

module.exports = router;