const express = require('express');
const router = express.Router();
const { VerifyToken } = require('../auth/auth');

const AdminUserController = require('../controllers/adminuser');

router.get('/get-user', VerifyToken, AdminUserController.GetSingleUser);
router.get('/users', VerifyToken, AdminUserController.GetUsers);
router.post('/create-user', VerifyToken, AdminUserController.CreateUser);
router.post('/update-user', VerifyToken, AdminUserController.UpdateUser);

router.get('/role', VerifyToken, AdminUserController.GetRoles);
router.post('/create-role', VerifyToken, AdminUserController.CreateRole);
router.get('/role-permission', VerifyToken, AdminUserController.GetRolePermission);
router.post('/update-role', VerifyToken, AdminUserController.UpdateRole);


router.get('/permission', VerifyToken, AdminUserController.GetPermissions);
router.post('/create-permission', VerifyToken, AdminUserController.CreatePermission);
router.post('/update-permission', VerifyToken, AdminUserController.UpdatePermission);


module.exports = router;