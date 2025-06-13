
import { Router } from 'express';
import { 
  loginUser,
  refreshToken
} from '../services/auth.service';
import { validate } from '../middleware/validation.middleware';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/login',
  validate([
    body('username').notEmpty(),
    body('password').notEmpty()
  ]),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const result = await loginUser(username, password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/refresh',
  validate([
    body('token').notEmpty()
  ]),
  async (req, res, next) => {
    try {
      const { token } = req.body;
      const newToken = await refreshToken(token);
      res.json({ token: newToken });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
