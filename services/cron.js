const cron = require('node-cron');
const mailModel = require('../models/mail.model');
const { sendMail } = require('../services/sent.mail');
const EVERY_MINUTE = '* * * * * ';

/**
 * cron-job 
 * @author Sibasish Das <sibasishdas@globussoft.in>
 */

const jobSchedule = async () => {

    /**
     * job schedule for deleting token
     * @author Sibasish Das <sibasishdas@globussoft.in>
     */

    cron.schedule(EVERY_MINUTE, async () => {
        try {
            console.log("cron started========")
            let cuurentTime = Math.floor(new Date().getTime() / 1000);
            const data = await mailModel.usersToMail(cuurentTime);
            for (let user of data) {
                console.log(user);
                let msg = {
                    to: user.email,
                    from: 'dassibasishdas@gmail.com',
                    subject: 'sent mail',
                    html: user.message,
                };
                let ifMailSent = await sendMail(msg);
                console.log(ifMailSent);
                if (!ifMailSent) {
                    console.log(ifMailSent);
                    let update = await mailModel.updateIsMailsent(user.id);
                }
            }

        } catch (error) {
            console.log('error')
            console.log(error);
        }
    })
}

jobSchedule()


module.exports = jobSchedule;