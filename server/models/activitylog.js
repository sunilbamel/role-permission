const { Model, DataTypes } = require("sequelize");
const model = require("../config/db");

const initActivityLog = (sequelize, DataTypes) => {
    class ActivityLog extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    ActivityLog.init({
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "admins",
                key: 'id',
                as: "user_id"
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT"
        },
        ip_address: {
            type: DataTypes.STRING
        },
        payload: {
            type: DataTypes.TEXT
        },
        response: {
            type: DataTypes.TEXT,
            defaultValue: null
        },
        type: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'ActivityLog',
        tableName: "activity_logs",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return ActivityLog
}

module.exports = initActivityLog(model, DataTypes);