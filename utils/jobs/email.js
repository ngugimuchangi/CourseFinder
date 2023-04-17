import nodemailer from 'nodemailer';

// Email class
class Email {
/**
 * Sends email to user
 * @param {string} email - user email address
 * @param {string} subject - email subject
 * @param {string} text - email body
 */
  static async sendEmail(email, subject, text) {
    const {
      MAIL_HOST, MAIL_SERVICE, MAIL_PORT, MAIL_USER, MAIL_PASSWORD,
    } = process.env;
    try {
      const transporter = nodemailer.createTransport({
        host: MAIL_HOST,
        service: MAIL_SERVICE,
        port: MAIL_PORT,
        secure: true,
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: MAIL_USER,
        to: email,
        subject,
        text,
      });
    } catch (error) {
      throw new Error(`Sending email failed\n\tto: ${email}\n\tsubject: ${subject}\n\ttext: ${text}`);
    }
  }
}

export default Email;
