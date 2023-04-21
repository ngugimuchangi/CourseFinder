import ClassifyCourse from './classify';
import DBClient from '../../shared/db';

// Train classifier
(async () => {
  await DBClient.connect();
  await ClassifyCourse.trainClassifier();
  console.log('Classification training completed');
})();
