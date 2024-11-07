const validation = require("./validation");


exports.AuthValidation = {
    Login(data) {
        const rules = {
            "email": "required|email",
            "password": "required|string"
        }
        return validation(data, rules);
    },
    VerifyOtp(data) {
        const rules = {
            "email": "required|email",
            "otp": "required|string"
        }
        return validation(data, rules);
    },
    ResendOtp(data) {
        const rules = {
            "email": "required|email"
        }
        return validation(data, rules);
    },

}

exports.AdminUserValidation = {
    CreateUser(data) {
        const rules = {
            "name": "required|string",
            "email": "required|email",
            "password": "required|string",
            "roleId": "required|integer"
        }
        return validation(data, rules);
    },
    CreateRole(data) {
        const rules = {
            "role": "required|string",
        }
        return validation(data, rules);
    },
    UpdateRole(data) {
        const rules = {
            "roleId": "required|integer",
            "status": "required|in:0,1",
            "permissions": "required|array"
        }
        return validation(data, rules);
    },
    CreatePermission(data) {
        const rules = {
            "name": "required|string",
            "shortcode": "required|string"
        }
        return validation(data, rules);
    },
    UpdatePermission(data) {
        const rules = {
            "id": "required|integer",
            "status": "required|in:true,false"
        }
        return validation(data, rules);
    },
    UpdateUser(data) {
        const rules = {
            "id": "required|integer",
            "status": "required|in:true,false"
        }
        return validation(data, rules);
    }

}
