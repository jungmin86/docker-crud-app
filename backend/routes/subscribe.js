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
    models.Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err);
        let result = false;
        if(subscribe.length !== 0) {
            result = true;
        }
        res.status(200).json({ success: true, subscribed: result });
    })
  });
  

module.exports = router;