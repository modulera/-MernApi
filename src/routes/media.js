import express from 'express';
const router = express.Router();

import media from '../controllers/media';

router.get('/files', media.Index);
router.post('/files', media.Upload);
router.delete('/files', media.Delete);

export default router;
