import dotenv from 'dotenv';
import { BayesClassifier } from 'natural';
import Subcategory from '../models/subcategory';

dotenv.config();

const { CLASSIFIER_DOC } = process.env;

/**
 * Trains course classifier
 */
export async function trainClassifier() {
  try {
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
 * Classifies course based on it title and description
 * @param {string} token - course classification token
 * @returns {Promise} - promise that resolves with subcategory id based on classification results
 */
export async function classify(token) {
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

const classification = { trainClassifier, classify };
export default classification;
