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
router.post('/auth/login', AuthController.login);
router.get('/auth/logout', AuthController.logout);
router.get('/auth/verify-email', AuthController.getEmailToken);
router.put('/auth/verify-email/:userId/:token', AuthController.putVerifyEmail);
router.post('/auth/reset-password/', AuthController.postResetPassword);
router.put('/auth/reset-password/:userId/:token', AuthController.putResetPassword);

// Users endpoints
router.post('/users', UserController.postUser);
router.get('/users/me', UserController.getUser);
router.delete('/users/me', UserController.deleteUser);
router.put('/users/me/email', UserController.putEmail);
router.put('/users/me/password', UserController.putPassword);
router.put('/users/me/topics', UserController.putTopic);
router.get('/users/me/bookmarks', UserController.getBookmarks);
router.put('/users/me/bookmarks', UserController.putBookmark);
router.delete('/users/me/bookmarks/:courseId', UserController.deleteBookmark);

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
