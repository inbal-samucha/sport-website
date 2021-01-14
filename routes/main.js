const path = require('path');

const express = require('express');

const userControllers = require('../controllers/users');

const router = express.Router();

// const membList = userList.usersList;

router.get('/', userControllers.getUsers);

module.exports = router;