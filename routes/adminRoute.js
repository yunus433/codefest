const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');

const indexGetController = require('../controllers/admin/index/get');
const loginGetController = require('../controllers/admin/login/get');
const applicationsGetController = require('../controllers/admin/applications/get');
const applicationsDeleteController = require('../controllers/admin/applications/delete');

const loginPostController = require('../controllers/admin/login/post');

router.get(
  '/',
    isAdmin,
    indexGetController
);
router.get(
  '/login',
    loginGetController
);
router.get(
  '/applications',
    isAdmin,
    applicationsGetController
);
router.get(
  '/applications/delete',
    isAdmin,
    applicationsDeleteController
);

router.post(
  '/login',
    loginPostController
);

module.exports = router;
