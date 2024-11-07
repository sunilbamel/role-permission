const Admin = require('./admin');
const ActivityLog = require('./activitylog');
const VerifyOtp = require('./verifyotp');
const Role = require('./role');
const PermissionGroup = require('./permissiongroup');
const RolePermission = require('./rolepermission');

Admin.belongsTo(Role, { foreignKey: 'role_id' });
RolePermission.belongsTo(PermissionGroup, { foreignKey: "permission_id" });

module.exports = {
    Admin,
    ActivityLog,
    VerifyOtp,
    Role,
    PermissionGroup,
    RolePermission
}