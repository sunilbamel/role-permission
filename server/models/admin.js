const { DataTypes, Model } = require('sequelize');
const model = require('../config/db');

const initAdmin = (sequelize, DataTypes) => {
    class Admin extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    Admin.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "roles",
                key: 'id',
                as: "role_id"
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT"
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        sequelize,
        modelName: 'Admin',
        tableName: "admins",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return Admin;
}

module.exports = initAdmin(model, DataTypes);