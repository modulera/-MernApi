import express from 'express';
const router = express.Router();

import media from '../controllers/media';

router.get('/files', media.Index);
router.post('/upload', media.Upload);
router.delete('/upload', media.Delete);

export default router;
