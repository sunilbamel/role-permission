const { DataTypes, Model } = require('sequelize');
const model = require('../config/db');

const initRolePermission = (sequelize, DataTypes) => {
    class RolePermission extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    RolePermission.init({
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
        permission_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "permissiongroups",
                key: 'id',
                as: "permission_id"
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT"
        },
        edit:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        view:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        add:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        delete:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        super_admin: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'RolePermission',
        tableName: "rolepermissions",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return RolePermission;
}

module.exports = initRolePermission(model, DataTypes);