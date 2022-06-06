import Boom from "boom";
import { wait } from "../../helpers";

import { User, Media } from "../../models";
// User.hasOne(Media, { as: "user" });

// validate uploaded images
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
		// console.log(file)
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, file.fieldname + '__' + uniqueSuffix + `.${FILE_TYPE_MAP[file.mimetype]}`)
	},
});

const fileUpload = multer({
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
}).fields([{ name: 'images', maxCount: 12 }]);

const loadFiles = (req, res) => new Promise((resolve, reject) => {
	const response = {
		status: "unknown",
		description: null,
	}

	fileUpload(req, res, (error) => {
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
			files: req.files.images,
		});
	})
});

const Upload = async (req, res, next) => {
	const payload = req.payload;

	try {
		const response = await loadFiles(req, res);

		for await (const file of response.files) {
			console.log(file);

			response.description = {
				...response.description,
				description: await Media.create({
					name: file?.filename,
					path: file?.destination,
					size: file?.size,
					mimetype: file?.mimetype,
					userId: payload?.user_id,
					categoryId: null,
				})
			}
		}

		res.json(response);
	} catch (e) {
		return next(e);
	}
};

const Delete = async (req, res, next) => {
	console.log('Removed files');

	res.json({
		description: 'Removed image(s)'
	});
};

const Index = async (req, res, next) => {
	const payload = req.payload;
	const response = { status: "unknown", description: null }

	try {
		response.description = await Media.findAll({
			where: {
				userId: payload.user_id
			}
		});

		await wait(3000)

		res.json({
			...response,
			status: "success",
		});
	} catch (err) {
		return next({
			...response,
			status: "error",
			description: err,
		});
	}
};

export default {
	Index,
	Upload,
	Delete,
};
