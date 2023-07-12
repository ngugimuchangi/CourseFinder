import Queue from 'bull';
import dotenv from 'dotenv';
import sendEmail from '../utils/email';

dotenv.config();

// Email Worker
const { REDIS_DEV_URI, REDIS_PROD_URI } = process.env;
const redisUrl = process.env.ENV === 'prod' ? REDIS_PROD_URI : REDIS_DEV_URI;
const EmailWorker = new Queue('Send email', redisUrl);

EmailWorker.process((job) => {
  const { email, subject, body } = job.data;
  try {
    sendEmail(email, subject, body);
  } catch (error) {
    console.error(`Processing email job #${job.id} failed:\n\t${error.message}`);
  }
});

// Info log
EmailWorker.on('completed', (job) => {
  console.log(`Email job #${job.id} processed successful`);
});
