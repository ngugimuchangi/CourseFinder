import { Types } from 'mongoose';
import Category from '../../models/category';
import Subcategory from '../../models/subcategory';
import Format from '../../utils/api/format';

// Categories class controller
class CategoriesController {
  /**
   * Gets list of all categories
   * @typedef {import('express').Request} Request
   * @typedef {import('express').Response} Response
   * @typedef {import('express').NextFunction} Next
   * @param {Request} _req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async getCategories(_req, res, next) {
    let categories;
    try {
      categories = (await Category.find({}))
        .map((category) => Format.formatCategory(category));
    } catch (error) {
      next(error);
      return;
    }
    res.status(200).json(categories);
  }

  /**
   * Get a specific category by its id
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async getCategoriesById(req, res, next) {
    const { id } = req.params;
    let category;
    try {
      category = await Category.findById(id);
    } catch (error) {
      next(error);
      return;
    }
    if (!category) res.status(404).json({ error: 'Not found' });
    else res.status(200).json(Format.formatCategory(category));
  }

  /**
   * Gets list of subcategories for a specific category
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async getSubcategoriesByCategory(req, res, next) {
    let subcategories;
    const categoryId = Types.ObjectId.isValid(req.params.id)
      ? new Types.ObjectId(req.params.id)
      : req.params.id;
    try {
      subcategories = (await Subcategory.find({ category: categoryId }))
        .map((subcategory) => Format.formatSubcategory(subcategory));
    } catch (error) {
      next(error);
      return;
    }
    res.status(200).json({ count: subcategories.length, subcategories });
  }

  /**
   * Gets list of subcategories
   * @param {Request} _req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async getSubcategories(_req, res, next) {
    let subcategories;
    try {
      subcategories = (await Subcategory.find({}))
        .map((subcategory) => Format.formatSubcategory(subcategory));
    } catch (error) {
      next(error);
      return;
    }
    res.status(200).json(subcategories);
  }

  /**
   * Get a subcategory by its id
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async getSubcategoriesById(req, res, next) {
    const { id } = req.params;
    let subcategory;
    try {
      subcategory = await Subcategory.findById(id);
    } catch (error) {
      next(error);
      return;
    }
    if (!subcategory) res.status(404).json({ error: 'Not found' });
    else res.status(200).json(Format.formatSubcategory(subcategory));
  }
}

export default CategoriesController;
