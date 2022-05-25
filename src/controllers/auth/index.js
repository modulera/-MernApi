import Boom from "boom";
import { User } from "../../models";

// helpers
import {
	signAccessToken,
	signRefreshToken,
	verifyRefreshToken,
} from "../../helpers/jwt";

// validations
import ValidationSchema from "./validations";
import redis from "../../clients/redis";

const Register = async (req, res, next) => {
	const input = req.body;
	console.log(input);

	const { error } = ValidationSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		const isExists = await User.findOne({
			where: { email: input.email },
			attributes: { exclude: ['password'] }
		});

		if (isExists) {
			return next(Boom.conflict("This e-mail already using."));
		}

		if (input.password !== input.re_password) {
			return next(Boom.notAcceptable("password and re_password did not match."));
		}

		const userData = {
			"email": input.email,
			"phone": input.phone,
			"firstName": input.first_name,
			"lastName": input.last_name,
			"password": input.password,
			"role": ['user', 'admin'].includes(input.role) ? input.role.trim() : 'user',
		};
		const user = await User.create(userData);

		delete user.dataValues.password;

		const accessToken = await signAccessToken({
			user_id: user._id,
			role: user.role,
		});
		const refreshToken = await signRefreshToken(user._id);

		res.json({
			user,
			accessToken,
			refreshToken,
		});
	} catch (e) {
		next(e);
	}
};

const Login = async (req, res, next) => {
	const input = req.body;

	const { error } = ValidationSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		const user = await User.findOne({
			where: { email: input.email },
		});

		if (!user) {
			throw Boom.notFound("The email address was not found.");
		}

		const isMatched = await user.isValidPassword(input.password);
		if (!isMatched) {
			throw Boom.unauthorized("email or password not correct");
		}

		const accessToken = await signAccessToken({
			user_id: user.id,
			role: user.role,
		});
		const refreshToken = await signRefreshToken(user.id);

		delete user.dataValues.password;

		res.json({ user, accessToken, refreshToken });
	} catch (e) {
		return next(e);
	}
};

const RefreshToken = async (req, res, next) => {
	const { refresh_token } = req.body;

	try {
		if (!refresh_token) {
			throw Boom.badRequest();
		}

		const user_id = await verifyRefreshToken(refresh_token);
		const accessToken = await signAccessToken(user_id);
		const refreshToken = await signRefreshToken(user_id);

		res.json({ accessToken, refreshToken });
	} catch (e) {
		next(e);
	}
};

const Logout = async (req, res, next) => {
	try {
		const { refresh_token } = req.body;
		if (!refresh_token) {
			throw Boom.badRequest();
		}

		const user_id = await verifyRefreshToken(refresh_token);
		const data = await redis.del(user_id);

		if (!data) {
			throw Boom.badRequest();
		}

		res.json({ message: "success" });
	} catch (e) {
		console.log(e);
		return next(e);
	}
};

const Me = async (req, res, next) => {
	const { user_id } = req.payload;

	try {
		const user = await User.findByPk(user_id, {
			attributes: {
				// include: [], // define columns that you want to show
				exclude: ['password'] // define columns that you don't want 
			}
		});

		if (!user) {
			throw Boom.unauthorized("user not fount");
		}

		res.json(user);
	} catch (e) {
		console.log(e);
		next(e);
	}
};

export default {
	Register,
	Login,
	RefreshToken,
	Logout,
	Me,
};
