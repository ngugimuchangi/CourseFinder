import fs from 'node:fs';
import Category from '../models/category';
import Subcategory from '../models/subcategory';

// Helper class for unit tests
class LoadDataFromFile {
  /**
   * Add categories to database from an excel or csv file
   * @param {string} file - filepath to categories file
   */
  static async addCategories(file) {
    if (!fs.existsSync(file)) {
      console.error('Categories file doesn\'t exist');
      return;
    }
    const saveDocuments = [];
    try {
      const data = fs.readFileSync(file).split('\n').slice(1);
      for (const category of data) {
        const newCategory = new Category(category);
        saveDocuments.push(newCategory.save());
      }
      await Promise.all(saveDocuments);
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Add subcategories to database from an excel or csv file
   * @param {string} file - filepath to subcategories file
   */
  static async addSubcategories(file) {
    if (!fs.existsSync(file)) {
      console.error('Subcategories file doesn\'t exist');
      return;
    }
    const saveDocuments = [];
    async function saveSubcategory(subcategory) {
      const [title, categoryTitle, keywords] = subcategory.split(',');
      const category = await Category.findOne({ title: categoryTitle });
      if (category) {
        const newSubcategory = new Subcategory({
          title,
          category: category._id,
          keywords: keywords.split(','),
        });
        await saveDocuments.push(newSubcategory.save());
      }
    }
    try {
      const data = fs.readFileSync(file).split('\n').slice(1);
      for (const subcategory of data) {
        saveDocuments.push(saveSubcategory(subcategory));
      }
      await Promise.all(saveDocuments);
    } catch (error) {
      console.error(error.message);
    }
  }
}

const categoriesFile = '../files/categories.csv';
const subCategoriesFile = '../files/subcategories.csv';
LoadDataFromFile.addCategories(categoriesFile);
LoadDataFromFile.addSubcategories(subCategoriesFile);
