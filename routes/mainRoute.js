const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();

router.get('/',mainController.getMainPage);
router.get('/register',mainController.getRegisterPage);
router.get('/login',mainController.getLoginPage);
router.post('/register',mainController.postRegister);
router.post('/login', mainController.postLogin);
router.get('/secrets', mainController.getSecrets);
router.get('/submit',mainController.getSubmit);
router.post('/submit',mainController.postSubmit);
router.get('/logout',mainController.getLogout);

module.exports = router;