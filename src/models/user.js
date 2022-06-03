import bcrypt from "bcrypt";

import { DataTypes, Model } from 'sequelize';

import connection from '../clients/db';

const modelSchema = {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value!');
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'The e-mail address is already in use!'
        },
        validate: {
            notNull: {
                msg: 'Please enter your email.'
            }
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 16],
        },
    },
    role: {
        type: DataTypes.ENUM,
        values: ["user", "admin"],
        defaultValue: 'user',
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: {
            args: true,
            msg: 'The phone is already in use!'
        },
    },
}

const modelConfig = {
    sequelize: connection,
    modelName: 'users',
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    },
}

class UserModel extends Model {
    // we can override parent model init method.
    // static init(modelSchema, modelConfig) {
    //     return super.init(modelSchema, modelConfig)
    // }

    async isValidPassword(password) {
        return await bcrypt.compare(password, this.password);
    }
};

// https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/
// Run `.associate` if it exists,
// ie create relationships in the ORM
// Object.values(models)
//   .filter(model => typeof model.associate === "function")
//   .forEach(model => model.associate(models));

export const User = UserModel.init(modelSchema, modelConfig)

export default User;

// alternative method
// export default (connection) => UserModel.init(modelSchema, modelConfig);