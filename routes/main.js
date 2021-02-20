const path = require('path');

const express = require('express');

const userControllers = require('../controllers/users');

const router = express.Router();

router.get('/', userControllers.getUsers);
router.get('/main', userControllers.getUsers);

module.exports = router;