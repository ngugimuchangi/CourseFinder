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
        classifier.addDocument(subcategory.keywords, subcategory._id.toString());
      }
      classifier.train();
      classifier.save(CLASSIFIER_DOC);
    } catch (error) {
      throw new Error(`Training classifier failed => : ${error.message}`);
    }
  }

  /**
   * Classifies course based on it description
   * @param {string} token - course classification token
   * @returns {string} - subcategory id based on classification result
   */
  static async getCourseCategory(token) {
    let classifier;
    try {
      classifier = await BayesClassifier.load(CLASSIFIER_DOC);
    } catch (error) {
      throw new Error(`Loading classification failed => : ${error.message}`);
    }
    return classifier.classify(token.toLowerCase());
  }
}

export default ClassifyCourse;
