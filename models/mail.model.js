const mysqlConnection = require('../DBconnection/db');

class mailModel {
    /**
         * checkUserExist - function to check/find email in database
         * @param {*} email 
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

    usersToMail(time) {
        return new Promise((resolve, reject) => {
            const query = `SELECT id,email,message FROM schedule_mail where schedule_time = ${time}`;
            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    isIdExist(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT id FROM schedule_mail where id = ${id}`;
            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    updateIsMailsent(id,status) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE schedule_mail SET is_sent = ${status} where id = ${id}`;
            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

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

    AllScheduleMail() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM schedule_mail`;
            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }
    
    getScheduleTime(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT schedule_time FROM schedule_mail where id = ${id}`;
            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }
    unsentMail() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM schedule_mail where is_sent IN (0,2) ORDER BY id DESC`;
            mysqlConnection.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }
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