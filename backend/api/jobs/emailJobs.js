import Queue from 'bull';
import ejs from 'ejs';

const EmailQueue = new Queue('Send email');

/**
 * Creates an email job for new user welcome message,
 * email verification and password reset requests
 * @param {object} users - user object
 * @param {('welcome'|'verify'|'reset')} purpose - purpose of email
 * @param {string} token - password reset token
 */
async function addEmailJob(user, purpose, token) {
  const verifyEmailEndpoint = process.env.VERIFY_EMAIL_URI;
  const resetPasswordEndpoint = process.env.RESET_PASSWORD_URI;
  const resetParams = `/${user._id}/${token}`;
  let content;
  let link;
  let action;
  switch (purpose) {
    case 'welcome':
      content = 'Thank you for signing up. Please, click the link below to verify your email. '
          + 'The link will expire in 2 days.';
      link = verifyEmailEndpoint + resetParams;
      action = 'Confirm email';
      break;
    case 'verify':
      content = 'Please, click the link below to verify your email. The link will expire in 2 days.';
      link = verifyEmailEndpoint + resetParams;
      action = 'Confirm email';
      break;
    case 'reset':
      content = 'Your are receiving this email because you requested a password reset '
            + 'for your Course Finder account. Please click the link below to reset your password. '
            + 'The link will expire in 2 days.';
      link = resetPasswordEndpoint + resetParams;
      action = 'Reset password';
      break;
    default:
      throw new Error('Invalid action');
  }
  return new Promise((resolve, reject) => {
    ejs.renderFile(`${__dirname}/templates/email.ejs`, { content, link, action }, async (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      const jobData = {
        email: user.email,
        subject: 'Welcome to Course Finder',
        body: data,
      };
      await EmailQueue.add(jobData);
      resolve();
    });
  });
}

const emailJobs = { addEmailJob };
export default emailJobs;
