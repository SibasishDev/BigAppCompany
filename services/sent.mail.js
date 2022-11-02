const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

exports.sendMail = (msg) => {
    return new Promise((resolve,reject) => {
    sgMail.send(msg, function (err,result) {
        if (err) {
           resolve(false);
        }
        resolve(true)
    });
})
}