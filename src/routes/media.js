import express from 'express';
const router = express.Router();

// import Boom from "boom";

import media from '../controllers/media';

router.post('/upload', media.UploadImages);
router.delete('/upload', media.DeleteImages);

export default router;
