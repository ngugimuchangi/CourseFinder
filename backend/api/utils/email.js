import nodemailer from 'nodemailer';

// Email class
class Email {
/**
 * Sends email to user
 * @param {string} email - user email address
 * @param {string} subject - email subject
 * @param {string} data - email body
 */
  static async sendEmail(email, subject, body) {
    const { MAIL_USER, MAIL_PASSWORD, MAIL_SERVICE } = process.env;
    try {
      const transporter = nodemailer.createTransport({
        service: MAIL_SERVICE,
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
        html: body,
      });
    } catch (error) {
      const spacing = '\n\t';
      const errorMessage = `Sending email failed:${spacing}to: ${email}${spacing}`
        + `subject: ${subject}${spacing}error: ${error}`;
      throw new Error(errorMessage);
    }
  }
}

export default Email;
