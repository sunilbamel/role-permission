const { DataTypes, Model } = require('sequelize');
const model = require('../config/db');

const initPermissionGroup = (sequelize, DataTypes) => {
    class PermissionGroup extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    PermissionGroup.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        short_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        sequelize,
        modelName: 'PermissionGroup',
        tableName: "permissiongroups",
        timestamps: false
    });
    return PermissionGroup;
}

module.exports = initPermissionGroup(model, DataTypes);