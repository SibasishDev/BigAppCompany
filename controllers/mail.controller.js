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
            let { id, schTime, message, email } = req.body;
            message = message?.trim();
            if (!id) throw createError.NotFound('id is required!')
            if (!email?.trim() && !schTime?.trim() && !message?.trim()) throw createError.NotFound('atleast email/schedule_time/message with id is required!');
            let cuurentTime = Math.floor(new Date().getTime() / 1000);

            let [getScheduleTime] = await mailModel.getScheduleTime(id);

            if (!getScheduleTime) throw createError.NotFound('no data found!');

            if (getScheduleTime.schedule_time < cuurentTime) throw createError.BadRequest('Message already sent');

            let time = Math.floor(new Date(schTime).getTime() / 1000);

            if (time <= cuurentTime) throw createError.BadRequest('Time should be greater than current time');

            let update_data = await mailModel.updateScheduleData({ id, time, message, email });

            if (update_data.changedRows == 0) return res.status(400).json({
                code: 400,
                status: 'fail',
                message: 'No Changes Done!'
            });

            return res.status(200).json({
                code: 200,
                status: 'ok',
                message: 'updated successfully!'
            });
        } catch (e) {
            next(e);
        }
    }

    async getAllScheduleMail(req, res, next) {
        try {
            let data = await mailModel.AllScheduleMail();
            return res.status(200).json({
                code: 200,
                status: 'ok',
                data: data
            });

        } catch (e) {
            next(e);
        }
    }

    async unsentFailMailList(req, res, next) {
        try {
            let data = await mailModel.unsentMail();

            if (!data.length) return res.status(400).json({
                code: 400,
                status: 'fail',
                message: 'No  mail found!'
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

            if (!id) throw createError.BadRequest('id field is required!');

            let [isExist] = await mailModel.isIdExist(id);

            if(!isExist) throw createError.BadRequest('id not found!');

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