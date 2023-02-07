const express = require('express');
const sectorsController = require('../controllers/sectorController');
const registerController = require('../controllers/registerController');
const sessionController = require('../controllers/sessionController');
const cors = require('cors');

const router = express.Router();


router.get('/sectors', cors(), sectorsController.getSectors);
router.get('/register', cors(), registerController.getRegister);
router.post('/register',cors(),  registerController.postRegister);
router.post('/session', cors(), sessionController.postSession);

module.exports = router;

