const router = require('express').Router();
const mailcontroller = require('../controllers/mail.controller');

router.post('/create', mailcontroller.createScheduleEmail);
router.post('/update', mailcontroller.updateScheduleEmail);
router.get('/all-list', mailcontroller.getAllScheduleMail);
router.get('/list', mailcontroller.unsentMailList);
router.delete('/delete', mailcontroller.deleteScheduleMail);

module.exports = router;