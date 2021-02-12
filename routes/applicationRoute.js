const express = require('express');
const router = express.Router();

const indexGetController = require('../controllers/application/get');

const indexPostController = require('../controllers/application/post');

router.get(
  '/',
    indexGetController
);

router.post(
  '/',
    indexPostController
);

module.exports = router;
