import Boom from "boom";
import { wait } from "../../helpers";

import { User } from "../../models";

const Delete = async (req, res, next) => {
	console.log('Removed user(s)');

	res.json({
		description: 'Removed user(s)'
	});
};

const Index = async (req, res, next) => {
	const payload = req.payload;
	const response = { status: "unknown", description: null }

	let qparams = {
		attributes: { exclude: ['password'] }
	}

	if (payload?.user_id) {
		qparams.where = {
			id: payload.user_id
		}
	}

	try {
		response.description = await User.findAll(qparams);

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
	Delete,
};
