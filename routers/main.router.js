const router = require('express').Router();
const mailcontroller = require('../controllers/mail.controller');

router.post('/create', mailcontroller.createScheduleEmail);
router.post('/update', mailcontroller.updateScheduleEmail);
router.get('/getlist', mailcontroller.getAllScheduleMail);
router.get('/unsentlist', mailcontroller.unsentFailMailList);
router.delete('/delete', mailcontroller.deleteScheduleMail);

module.exports = router;