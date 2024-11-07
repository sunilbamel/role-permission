const { DataTypes, Model } = require('sequelize');
const model = require('../config/db');

const initVerifyOtp = (sequelize, DataTypes) => {
    class VerifyOtp extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    VerifyOtp.init({
        email:{
            type:DataTypes.STRING
        },
        otp:{
            type:DataTypes.INTEGER
        },
        expired_at:{
            type:DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'VerifyOtp',
        tableName: "verify_otps",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return VerifyOtp;
}

module.exports = initVerifyOtp(model, DataTypes);