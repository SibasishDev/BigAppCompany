const mysqlConnection = require('../DBconnection/db');

class mailModel {
    /**
     *  createMail - crete schedule mail 
         * @param {*} data 
         * @returns 
         */

    createMail(data) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO schedule_mail (email,message,schedule_time) VALUES('${data.email}','${data.message}',${data.time})`;
            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    /**
    * usersToMail - send mail to user 
        * @param {*} time 
        * @returns 
        */

    usersToMail(time) {
        return new Promise((resolve, reject) => {
            const query = `SELECT id,email,message FROM schedule_mail where schedule_time = ${time}`;
            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    /**
    * isIdExist - check id exist 
        * @param {*} id 
        * @returns 
        */

    isIdExist(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT id FROM schedule_mail where id = ${id}`;
            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    /**
    * updateIsMailsent -update mail status
        * @param {*} id  
        * @param {*} status  
        * @returns 
        */

    updateIsMailsent(id, status) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE schedule_mail SET is_sent = ${status} where id = ${id}`;
            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    /**
    * updateScheduleData - update mail schedule data
        * @param {*} data 
        * @returns 
        */

    updateScheduleData({ id, time, message, email }) {
        return new Promise((resolve, reject) => {
            let updateStr = ``;
            if (time) {
                updateStr += updateStr ? `, schedule_time = '${time}'` : `SET schedule_time = '${time}'`;
            }

            if (message) {
                updateStr += updateStr ? `, message = '${message}'` : `SET message = '${message}'`;
            }

            if (email) {
                updateStr += updateStr ? `, email = '${email}'` : `SET email = '${email}'`;
            }

            const query = `UPDATE schedule_mail ${updateStr} WHERE id = '${id}';`;

            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    /**
     *AllScheduleMail - get all the list of schedule mail 
         * @param {*}  
         * @returns 
         */

    AllScheduleMail() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM schedule_mail`;
            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    /**
     *getScheduleTime - get schedule time
         * @param {*}  id
         * @returns 
         */

    getScheduleTime(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT schedule_time FROM schedule_mail where id = ${id}`;
            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    /**
     * unsentMail - get all unsent mail
         * @param {*}  
         * @returns 
         */

    unsentMail() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM schedule_mail where is_sent IN (0,2) ORDER BY id DESC`;
            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    /**
     * deleteScheduleMail - delete schedule mail
         * @param {*}  id
         * @returns 
         */

    deleteScheduleMail(id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM schedule_mail WHERE id = ${id}`;
            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

}

module.exports = new mailModel();