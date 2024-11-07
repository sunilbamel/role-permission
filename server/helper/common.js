const { RolePermission, PermissionGroup, Admin, Role } = require("../models")

const VerifyPermissoin = async ({ roleId, shortcode, type = null }) => {
    const data = {
        status: false,
        msg: null
    }
    const params = {
        role_id: roleId
    }
    if (!roleId) {
        data.msg = "Please enter role id."
        return data
    } else if (!shortcode) {
        data.msg = "Please enter short code."
        return data
    }
    if (type == "add") {
        params.add = 1
    } else if (type == "view") {
        params.view = 1
    } else if (type == "edit") {
        params.edit = 1
    } else if (type == "delete") {
        params.delete = 1
    } else {
        data.msg = "Please enter a valid type."
        return data
    }
    const isuperadmin = await RolePermission.findOne({
        where: {
            role_id: roleId,
            super_admin: 1
        }
    })
    if (isuperadmin) {
        data.status = true;
        return data
    }
    const isexist = await RolePermission.findOne({
        where: params,
        include: [
            {
                model: PermissionGroup,
                where: {
                    short_code: shortcode,
                    status: 1
                }
            }
        ]
    })
    if (!isexist) {
        data.msg = "You dont have this permission."
        return data;
    }

    data.status = true;
    return data;
}

const checkUser = async (req) => {
    const data = {
        status: false,
        msg: null
    }
    const user = await Admin.findOne({
        where: {
            id: req.user.id,
        },
        include: [
            {
                model: Role,
                where: {
                    status: 1
                }
            }
        ]
    })
    if (!user) {
        data.msg = "Invalid request."
        return data;
    }
    if (user.status == 0) {
        data.msg = "You are not active."
        return data
    }
    data.status = true;
    return data
}

module.exports = {
    VerifyPermissoin,
    checkUser
}