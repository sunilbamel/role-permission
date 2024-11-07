const { DataTypes, Model } = require('sequelize');
const model = require('../config/db');

const initRole = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    Role.init({
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        sequelize,
        modelName: 'Role',
        tableName: "roles",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return Role;
}

module.exports = initRole(model, DataTypes);