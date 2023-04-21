import Queue from 'bull';
import dotenv from 'dotenv';
import Email from '../utils/jobs/email';

dotenv.config();

// Email Worker
const EmailWorker = new Queue('Send email');

EmailWorker.process((job) => {
  const { email, subject, body } = job.data;
  try {
    Email.sendEmail(email, subject, body);
  } catch (error) {
    console.error(`Processing email job #${job.id} failed:\n\t${error.message}`);
  }
});

// Info log
EmailWorker.on('completed', (job) => {
  console.log(`Email job #${job.id} processed successful`);
});
