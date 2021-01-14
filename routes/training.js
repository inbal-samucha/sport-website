const express = require('express');
const router = express.Router();

const trainingControllers = require('../controllers/trainingProgram');

router.get('/training', trainingControllers.getTraining);

router.get('/absTraining', trainingControllers.getAbsTraining);

router.get('/legsTraining', trainingControllers.getLegsTraining);

router.get('/shouldersTraining', trainingControllers.getShouldersTraining);

router.get('/chestTraining', trainingControllers.getChestTraining);

router.get('/backTraining', trainingControllers.getBackTraining);

router.get('/armTraining', trainingControllers.getArmTraining);

exports.routes = router;