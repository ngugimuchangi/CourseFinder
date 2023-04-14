import { BayesClassifier } from 'natural';
import Subcategory from '../../models/subcategory';

// Classification class
class ClassifyCourse {
  static CLASSIFIER_DOC = process.env || 'course_classifier.json';

  /**
   * Trains course classifier
   */
  static async trainClassifier() {
    const categories = await Subcategory.find({});
    const classifier = new BayesClassifier();
    for (const category of categories) {
      classifier.addDocument(category.keywords, category._id.toString());
    }
    await classifier.train();
    try {
      await classifier.save(this.CLASSIFIER_DOC);
    } catch (error) {
      console.error(`Saving classification failed => : ${error.message}`);
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
      classifier = await BayesClassifier.load(this.CLASSIFIER_DOC);
    } catch (error) {
      console.error(`Loading classification failed => : ${error.message}`);
    }
    return classifier.classify(token.toLowerCase());
  }
}

export default ClassifyCourse;
