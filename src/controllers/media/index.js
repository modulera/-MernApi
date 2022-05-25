// import { User } from "../../models";
import Boom from "boom";

// validate uploaded files
const FILE_TYPE_MAP = {
	"image/gif": "gif",
	"image/png": "png",
	"image/jpg": "jpg",
	"image/jpeg": "jpeg",
};

import multer from "multer";
const imageStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		console.log(file)
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, file.fieldname + '__' + uniqueSuffix + `.${FILE_TYPE_MAP[file.mimetype]}`)
	},
});

const imageUpload = multer({
	storage: imageStorage,
	limits: {
		fileSize: 10000000 // 10000000 Bytes = 10 MB
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(png|jpg|jpeg|gif)$/)) {
			return cb(new Error('Please upload a Image'));
		}
		cb(undefined, true);
	}
}).fields([{ name: 'files', maxCount: 12 }]);

const loadFiles = (req, res) => new Promise((resolve, reject) => {
	const response = {
		status: "unknown",
		description: null,
	}

	imageUpload(req, res, (error) => {
		if (error) {
			return reject({
				...response,
				status: "error",
				message: error?.message || 'An unknown error occurred when uploading.',
				description: error,
			});
		}

		// Everything went fine.
		return resolve({
			...response,
			status: "success",
			message: "Uploaded image(s)"
		});
	})
});

const UploadImages = async (req, res, next) => {
	try {
		const response = await loadFiles(req, res);

		res.json(response);
	} catch (e) {
		return next(e);
	}
};

const DeleteImages = async (req, res, next) => {
	console.log('Removed files');

	res.json({
		description: 'Removed image(s)'
	});
};

export default {
	UploadImages,
	DeleteImages,
};
