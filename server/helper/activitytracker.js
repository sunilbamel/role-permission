const { ActivityLog } = require("../models");

const CreateActivityLog = async (type, req, body, user_id = null, headers = null) => {
    const ip_address = req.header('x-forwarded-for') || req.socket.remoteAddress;
    const payload = {
        body: body,
        header: headers
    }
    const data = await ActivityLog.create({
        type: type,
        user_id: user_id,
        ip_address: ip_address,
        payload: JSON.stringify(payload),
    })
    return data;
}

const UpdateActivityLog = async (logid, res, status, user_id = null) => {
    const data = await ActivityLog.findOne({
        where: {
            id: logid
        }
    })
    data.response = JSON.stringify(res);
    data.status = status;
    if (user_id) {
        data.user_id = user_id;
    }
    await data.save();
}

module.exports = {
    CreateActivityLog,
    UpdateActivityLog
}