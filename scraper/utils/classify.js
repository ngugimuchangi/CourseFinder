import { BayesClassifier } from 'natural';
import Subcategory from '../../models/subcategory';
import DBClient from '../../utils/db';

const CLASSIFIER_DOC = process.env.CLASSIFIER_DOC || './scraper/utils/course_classifier.json';

// Classification class
class ClassifyCourse {
  /**
   * Trains course classifier
   */
  static async trainClassifier() {
    try {
      await DBClient.connect();
      const subcategories = await Subcategory.find({});
      const classifier = new BayesClassifier();
      for (const subcategory of subcategories) {
        classifier.addDocument(subcategory.keywords.join(' '), subcategory._id.toString());
      }
      classifier.train();
      classifier.save(CLASSIFIER_DOC);
    } catch (error) {
      throw new Error(`Training classifier failed => : ${error}`);
    }
  }

  /**
   * Classifies course based on it description
   * @param {string} token - course classification token
   * @returns {Promise} - promise that resolves with subcategory id based on classification results
   */
  static async getCourseCategory(token) {
    return new Promise((resolve, reject) => {
      BayesClassifier.load(CLASSIFIER_DOC, null, async (error, classifier) => {
        if (error) {
          reject(new Error(`Loading classification failed => : ${error}`));
          return;
        }
        resolve(classifier.classify(token.toLowerCase()));
      });
    });
  }
}

export default ClassifyCourse;
