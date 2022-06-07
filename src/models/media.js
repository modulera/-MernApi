import { DataTypes, Model } from 'sequelize';

import connection from '../clients/db';

import User from './user'

const modelSchema = {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullPath: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.path}${this.name}`;
        },
        set(value) {
            throw new Error('Do not try to set the `path` value!');
        }
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mimetype: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    categoryId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}

const modelConfig = {
    sequelize: connection,
    modelName: 'medias',
}

class MediaModel extends Model {
    // we can override parent model init method.
    // static init(modelSchema, modelConfig) {
    //     return super.init(modelSchema, modelConfig)
    // }
};

export const Media = MediaModel.init(modelSchema, modelConfig);

export default Media;