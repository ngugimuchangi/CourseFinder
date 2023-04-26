import { trainClassifier } from './classify';
import db from './db';

/** Train classifier */
async function train() {
  await db.connect();
  await trainClassifier();
  console.log('Classification training completed');
}
train().then(() => setTimeout(() => process.exit(), 5000));
