import { Types } from 'mongoose';
import Category from '../models/category';
import Subcategory from '../models/subcategory';
import formats from '../utils/format';

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
        .map((category) => formats.formatCategory(category));
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
    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Not found' });
    }
    try {
      category = await Category.findById(id);
    } catch (error) {
      return next(error);
    }
    if (!category) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(formats.formatCategory(category));
  }

  /**
   * Gets list of subcategories for a specific category
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async getSubcategoriesByCategory(req, res, next) {
    let subcategories;
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(200).json({ count: 0, subcategories: [] });
    }
    try {
      subcategories = (await Subcategory.find({ category: id }))
        .map((subcategory) => formats.formatSubcategory(subcategory));
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ count: subcategories.length, subcategories });
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
        .map((subcategory) => formats.formatSubcategory(subcategory));
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(subcategories);
  }

  /**
   * Get a subcategory by its id
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async getSubcategoriesById(req, res, next) {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Not found' });
    }
    let subcategory;
    try {
      subcategory = await Subcategory.findById(id);
    } catch (error) {
      return next(error);
    }
    if (!subcategory) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(formats.formatSubcategory(subcategory));
  }
}

export default CategoriesController;
