const mailModel = require('../models/mail.model');
const createError = require('http-errors');


class MailController {


    async createScheduleEmail(req, res, next) {
        try {
            const { email, message, schTime } = req.body;
            if (!email?.trim() || !message?.trim() || !schTime?.trim()) throw createError.BadRequest('All fields are required!');
            let time = Math.floor(new Date(schTime).getTime() / 1000);
            let cuurentTime = Math.floor(new Date().getTime() / 1000);
            if (time <= cuurentTime) throw createError.BadRequest('Time should be greater than current time');
            let data = await mailModel.createMail({ email, message, time });
            if (data.affectedRows === 1) return res.status(201).json({
                status: 200,
                message: "request created successfully!"
            });
            throw createError.BadRequest('Something went wrong');
        } catch (e) {
            next(e);
        }

    }

    async updateScheduleEmail(req, res, next) {
        try {
            const { id, schTime, message } = req.body;
            if(!id) throw createError.NotFound('id is required!')
            if (!schTime?.trim() && !message?.trim()) throw createError.NotFound('atleast schedule time/message with id is required!');
            let cuurentTime = Math.floor(new Date().getTime() / 1000);
            let [getScheduleTime] = await mailModel.getScheduleTime(id );

            if(getScheduleTime.schedule_time < cuurentTime) throw createError.BadRequest('Message already sent');

            let time = Math.floor(new Date(schTime).getTime() / 1000);

            if (time <= cuurentTime) throw createError.BadRequest('Time should be greater than current time');
            let data = {id : id};
           
            let key = ''; 
            let value = '';


            let update = await mailModel.updateScheduleData({ id, time, message });
            if (update_data.changedRows == 0) return res.status(400).json({
                code: 400,
                status: 'fail',
                message: 'No Changes Done!'
            });

            return res.status(200).json({
                code: 200,
                status: 'ok',
                message: 'update successfully!',
                data: data
            });

        } catch (e) {
            next(e);
        }
    }

    async getAllScheduleMail(req, res, next) {  //read
        try {
            let data = await mailModel.AllScheduleMail();
            // data = data.map((element) => {
            //     console.log(element.is_sent);
            //     element.is_sent = element.is_sent == 1 ? 'Sent' : (element.is_sent == 0 ? 'Failed' : 'Scheduling');
            //     return element;
            // })

            return res.status(200).json({
                code: 200,
                status: 'ok',
                data: data
            });



        } catch (e) {
            next(e);
        }
    }

    async unsentMailList(req, res, next) { //unsent
        try {
            let data = await mailModel.unsentMail();
            if (!data) return res.status(400).json({
                code: 400,
                status: 'fail',
                message: 'No unsent mail found!'
            });
            return res.status(200).json({
                code: 200,
                status: 'ok',
                data: data
            });
        } catch (e) {
            next(e);
        }

    }
    async unsentFailMailList(req, res, next) { //unsent
        try {
            let data = await mailModel.unsentMail();
            if (!data) return res.status(400).json({
                code: 400,
                status: 'fail',
                message: 'No unsent mail found!'
            });
            return res.status(200).json({
                code: 200,
                status: 'ok',
                data: data
            });
        } catch (e) {
            next(e);
        }

    }

    async deleteScheduleMail(req, res, next) {
        try {
            const { id } = req.body;
            if (!id) throw createError.BadRequest('id field is required');
            let deleteScheduleMail = await mailModel.deleteScheduleMail(id);
            return res.status(200).json({
                code: 200,
                status: 'ok',
                message: 'Schedule mail deleted successfully!'
            });

        } catch (e) {
            next(e);
        }

    }


}

module.exports = new MailController();