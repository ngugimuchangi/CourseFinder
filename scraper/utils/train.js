import ClassifyCourse from './classify';
// Train classifier
(async () => {
  await ClassifyCourse.trainClassifier();
  console.log('Classification training completed');
})();
