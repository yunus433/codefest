const express = require('express');
const router = express.Router();

const indexGetController = require('../controllers/index/index/get');
const basitSoruGetController = require('../controllers/index/basit_soru/get');

const indexPostController = require('../controllers/index/index/post');

router.get(
  '/', 
    indexGetController
);
router.get(
  '/basit_soru', 
    basitSoruGetController
);

router.post(
  '/',
    indexPostController
);

module.exports = router;
