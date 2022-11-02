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
            let cuurentTime = Math.floor(new Date().getTime() / 1000);
            const data = await mailModel.usersToMail(cuurentTime);
            let status;
            for (let user of data) {
                let msg = {
                    to: user.email,
                    from: 'dassibasishdas@gmail.com',
                    subject: 'sent mail',
                    html: user.message,
                };
                let ifMailSent = await sendMail(msg);
                if(ifMailSent){
                    let update = await mailModel.updateIsMailsent(user.id, status = 1);
                }

                if (!ifMailSent) {
                    let update = await mailModel.updateIsMailsent(user.id,status = 2);
                }
            }

        } catch (error) {
            console.log(error);
        }
    })
}

jobSchedule()


module.exports = jobSchedule;