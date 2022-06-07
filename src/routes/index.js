import { Router } from 'express';

// helpers
import { verifyAccessToken } from '../helpers/jwt';

// routes
import auth from './auth';
import media from './media';
import users from './users';

const router = Router();

router.get('/api', (req, res) => res.end('hey!'));

router.use('/api/auth', auth);
router.use('/api/media', verifyAccessToken, media);
router.use('/api/users', verifyAccessToken, users);

export default router;
