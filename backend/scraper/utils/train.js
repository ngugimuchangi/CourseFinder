import ClassifyCourse from './classify';
import DBClient from '../../shared/db';

// Train classifier
async function train() {
  await DBClient.connect();
  await ClassifyCourse.trainClassifier();
  console.log('Classification training completed');
}
train().then(() => setTimeout(() => process.exit(), 5000));
