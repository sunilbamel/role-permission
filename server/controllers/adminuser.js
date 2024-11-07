const { Op } = require("sequelize");
const { failed, success } = require("../helper/response");
const { AdminUserValidation } = require("../helper/validationRules");
const { Role, Admin, RolePermission, PermissionGroup } = require("../models")
const bcrypt = require('bcryptjs');
const { VerifyPermissoin, checkUser } = require("../helper/common");


const GetSingleUser = async (req, res) => {
    try {
        const isexist = await checkUser(req)
        if (isexist.status == false) {
            throw new Error(isexist.msg)
        }
        const user = await Admin.findOne({
            where: {
                id: req.user.id
            },
            include: [
                {
                    model: Role,
                    attributes: ['role']
                }
            ],
            attributes: ['name', 'email']
        })
        let data;
        if (user.Role.role == 'admin') {
            data = await RolePermission.findAll({
                where: {
                    role_id: req.user.roleId
                },
                include: [
                    {
                        model: PermissionGroup,
                        attributes: ['name', 'short_code']
                    }
                ],
                attributes: ['id', 'edit', 'view', 'add', 'delete']
            })
        } else {
            data = await RolePermission.findAll({
                where: {
                    role_id: req.user.roleId,
                    view: 1
                },
                include: [
                    {
                        model: PermissionGroup,
                        where: {
                            status: 1
                        },
                        attributes: ['name', 'short_code']
                    }
                ],
                attributes: ['id', 'edit', 'view', 'add', 'delete']
            })
        }

        return res.json(success('User data', { user: user, route: data }))
    } catch (err) {
        return res.json(failed(err.message))
    }
}

const GetUsers = async (req, res) => {
    try {
        const exist = await checkUser(req)
        if (exist.status == false) {
            throw new Error(exist.msg)
        }
        const returnValue = await VerifyPermissoin({ roleId: req.user.roleId, shortcode: "adminuser", type: 'view' })
        if (returnValue.status == false) {
            throw new Error(returnValue.msg)
        }
        const users = await Admin.findAll({
            where: {
                role_id: {
                    [Op.ne]: req.user.roleId
                }
            },
            include: [
                {
                    model: Role,
                    attributes: ['role']
                }
            ],
            attributes: ['name', 'email', 'status', 'id']
        });
        return res.json(success('Users list', users))
    } catch (err) {
        return res.json(failed(err.message))
    }
}

const CreateUser = async (req, res) => {
    try {
        const validationErrors = AdminUserValidation.CreateUser(req.body);
        if (validationErrors) {
            throw new Error(validationErrors);
        }
        const exist = await checkUser(req)
        if (exist.status == false) {
            throw new Error(exist.msg)
        }
        const returnValue = await VerifyPermissoin({ roleId: req.user.roleId, shortcode: "adminuser", type: 'add' })
        if (returnValue.status == false) {
            throw new Error(returnValue.msg)
        }
        const isexist = await Admin.findOne({
            where: {
                email: req.body.email,
                status: 1
            }
        })
        if (isexist) {
            throw new Error('This email alreay in use.')
        }
        const isrole = await Role.findOne({
            where: {
                id: req.body.roleId,
                status: 1
            }
        })
        if (!isrole) {
            throw new Error('Invalid request.')
        }

        const password = await bcrypt.hash(req.body.password, 10);
        await Admin.create({
            name: req.body.name,
            email: req.body.email,
            role_id: req.body.roleId,
            password: password
        })

        return res.json(success('Created successfully.'))
    } catch (err) {
        return res.json(failed(err.message))
    }
}

const UpdateUser = async (req, res) => {
    try {
        const validationErrors = AdminUserValidation.UpdateUser(req.body);
        if (validationErrors) {
            throw new Error(validationErrors);
        }
        const isexist = await checkUser(req)
        if (isexist.status == false) {
            throw new Error(isexist.msg)
        }
        const returnValue = await VerifyPermissoin({ roleId: req.user.roleId, shortcode: "adminuser", type: 'edit' })
        if (returnValue.status == false) {
            throw new Error(returnValue.msg)
        }

        const data = await Admin.findOne({
            where: {
                id: req.body.id
            }
        })

        if (!data) {
            throw new Error("Invalid request.")
        }

        if (req.body.status == false) {
            data.status = 0
        } else {
            data.status = 1
        }
        await data.save();
        return res.json(success(`${req.body.status == false ? 'Unactivated' : 'Activated'} successfully.`))
    } catch (err) {
        return res.json(failed(err.message))
    }
}

const GetRoles = async (req, res) => {
    try {
        const exist = await checkUser(req)
        if (exist.status == false) {
            throw new Error(exist.msg)
        }
        const returnValue = await VerifyPermissoin({ roleId: req.user.roleId, shortcode: "roles", type: 'view' })
        if (returnValue.status == false) {
            throw new Error(returnValue.msg)
        }

        const roles = await Role.findAll({
            where: {
                role: {
                    [Op.ne]: 'admin'
                }
            },
            attributes: ['role', 'id', 'status']
        });
        return res.json(success('Role list', roles))
    } catch (err) {
        return res.json(failed(err.message))
    }
}

const CreateRole = async (req, res) => {
    try {
        const validationErrors = AdminUserValidation.CreateRole(req.body);
        if (validationErrors) {
            throw new Error(validationErrors);
        }
        const exist = await checkUser(req)
        if (exist.status == false) {
            throw new Error(exist.msg)
        }
        const returnValue = await VerifyPermissoin({ roleId: req.user.roleId, shortcode: "roles", type: 'add' })
        if (returnValue.status == false) {
            throw new Error(returnValue.msg)
        }
        const isexist = await Role.findOne({
            where: {
                role: {
                    [Op.like]: `%${req.body.role}%`
                }
            }
        })
        if (isexist) {
            throw new Error("Role already exist.")
        }
        const newrole = await Role.create({
            role: req.body.role
        })
        if (req.body.permission.length > 0) {
            await req.body.permission.forEach(async (element) => {
                await RolePermission.create({
                    role_id: newrole.id,
                    edit: element.edit,
                    view: 1,
                    add: element.add,
                    delete: element.delete,
                    permission_id: element.permissionId
                })
            })
        }
        return res.json(success('Role created successfully.'))
    } catch (err) {
        return res.json(failed(err.message))
    }
}

const GetRolePermission = async (req, res) => {
    try {
        const exist = await checkUser(req)
        if (exist.status == false) {
            throw new Error(exist.msg)
        }
        const returnValue = await VerifyPermissoin({ roleId: req.user.roleId, shortcode: "roles", type: 'view' })
        if (returnValue.status == false) {
            throw new Error(returnValue.msg)
        }
        const role = await Role.findOne({
            where: {
                id: req.query.id
            },
            attributes: ['role', 'status']
        })
        if (!role) {
            throw new Error('Invalid request.')
        }
        const data = await RolePermission.findAll({
            where: {
                role_id: req.query.id
            },
            attributes: ['edit', 'view', 'add', 'delete', 'permission_id']
        })
        return res.json(success('Role permission list.', { data: data, role: role }))
    } catch (err) {
        return res.json(failed(err.message))
    }
}

const UpdateRole = async (req, res) => {
    try {
        const validationErrors = AdminUserValidation.UpdateRole(req.body);
        if (validationErrors) {
            throw new Error(validationErrors);
        }
        const exist = await checkUser(req)
        if (exist.status == false) {
            throw new Error(exist.msg)
        }
        const returnValue = await VerifyPermissoin({ roleId: req.user.roleId, shortcode: "roles", type: 'edit' })
        if (returnValue.status == false) {
            throw new Error(returnValue.msg)
        }
        const role = await Role.findOne({
            where: {
                id: req.body.roleId
            }
        })
        if (!role) {
            throw new Error("Role not found.")
        }
        role.status = req.body.status;
        req.body.permissions.forEach(async (element) => {
            const isexist = await RolePermission.findOne({
                where: {
                    role_id: req.body.roleId,
                    permission_id: element.permissionId
                }
            })
            if (isexist) {
                isexist.edit = element.edit;
                isexist.view = element.view;
                isexist.add = element.add;
                isexist.delete = element.delete;
                await isexist.save()
            } else {
                await RolePermission.create({
                    edit: element.edit,
                    view: 1,
                    add: element.add,
                    delete: element.delete,
                    permission_id: element.permissionId,
                    role_id: req.body.roleId,
                })
            }
        })
        await role.save()

        return res.json(success('Role updated successfully.'))
    } catch (err) {
        return res.json(failed(err.message))
    }
}

const GetPermissions = async (req, res) => {
    try {
        const isexist = await checkUser(req)
        if (isexist.status == false) {
            throw new Error(isexist.msg)
        }
        const returnValue = await VerifyPermissoin({ roleId: req.user.roleId, shortcode: "permissions", type: "view" });
        if (returnValue.status == false) {
            throw new Error(returnValue.msg)
        }
        const permissions = await PermissionGroup.findAll();
        return res.json(success('Permission list', permissions))
    } catch (err) {
        return res.json(failed(err.message))
    }
}

const CreatePermission = async (req, res) => {
    try {
        const validationErrors = AdminUserValidation.CreatePermission(req.body);
        if (validationErrors) {
            throw new Error(validationErrors);
        }
        const exist = await checkUser(req)
        if (exist.status == false) {
            throw new Error(exist.msg)
        }
        const returnValue = await VerifyPermissoin({ roleId: req.user.roleId, shortcode: "permissions", type: 'add' })
        if (returnValue.status == false) {
            throw new Error(returnValue.msg)
        }
        const isexist = await PermissionGroup.findOne({
            where: {
                short_code: {
                    [Op.like]: `%${req.body.short_code}%`
                }
            }
        })
        if (isexist) {
            throw new Error("Short code already exist, Please use another short code.")
        }
        const data = await PermissionGroup.create({
            name: req.body.name,
            short_code: req.body.shortcode
        })
        await RolePermission.create({
            role_id: req.user.roleId,
            permission_id: data.id,
            super_admin: 1,
            edit: 1,
            add: 1,
            delete: 1,
            view: 1
        })
        return res.json(success('Created successfully.'))
    } catch (err) {
        return res.json(failed(err.message))
    }
}

const UpdatePermission = async (req, res) => {
    try {
        const validationErrors = AdminUserValidation.UpdatePermission(req.body);
        if (validationErrors) {
            throw new Error(validationErrors);
        }
        const isexist = await checkUser(req)
        if (isexist.status == false) {
            throw new Error(isexist.msg)
        }
        const returnValue = await VerifyPermissoin({ roleId: req.user.roleId, shortcode: "permissions", type: 'edit' })
        if (returnValue.status == false) {
            throw new Error(returnValue.msg)
        }

        const data = await PermissionGroup.findOne({
            where: {
                id: req.body.id
            }
        })

        if (!data) {
            throw new Error("Invalid request.")
        }

        if (req.body.status == false) {
            data.status = 0
        } else {
            data.status = 1
        }
        await data.save();
        return res.json(success(`${req.body.status == false ? 'Unactivated' : 'Activated'} successfully.`))
    } catch (err) {
        return res.json(failed(err.message))
    }
}

module.exports = {
    GetRoles,
    CreateUser,
    GetPermissions,
    GetUsers,
    CreateRole,
    GetSingleUser,
    CreatePermission,
    UpdatePermission,
    GetRolePermission,
    UpdateRole,
    UpdateUser
}