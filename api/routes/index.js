import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AppController from '../controllers/AppController';
import CategoriesController from '../controllers/CategoriesController';
import CourseController from '../controllers/CoursesController';
import UserController from '../controllers/UsersController';

const router = Router();

// App status endpoints
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// Authentication endpoints
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/verify/', AuthController.verify);

// Users endpoints
router.post('/users', UserController.postUser);
router.get('/users/me', UserController.getUser);
router.delete('/users', UserController.deleteUser);
router.put('/users/email', UserController.putEmail);
router.put('/users/password', UserController.putPassword);
router.put('/users/reset-password', UserController.putPassword);
router.post('/users/bookmarks', UserController.postBookmark);
router.delete('/users/bookmarks', UserController.deleteBookmark);

// Categories endpoints
router.get('/categories', CategoriesController.getCategories);
router.get('/categories/:id', CategoriesController.getCategoriesById);
router.get('/categories/:id/subcategories', CategoriesController.getSubcategoriesByCategory);
router.get('/subcategories', CategoriesController.getSubcategories);
router.get('/subcategories/:id', CategoriesController.getSubcategoriesById);

// Courses endpoints
router.get('/courses', CourseController.getCourses);
router.get('/courses/:id', CourseController.getCoursesById);

export default router;
