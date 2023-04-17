import { Worker } from 'bullmq';
import Email from '../utils/jobs/email';

// Email Worker
const emailWorker = new Worker('send email', async (job) => {
  const { email, subject, text } = job;
  try {
    await Email.sendEmail(email, subject, text);
  } catch (error) {
    console.error(`Processing email job #${job.id} failed:\n\t${error.message}`);
  }
});

emailWorker.on('completed', (job) => {
  console.log(`Email job #${job.id} processed successful`);
});
