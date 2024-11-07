const success = (msg, data) => {
    var result = {}
    result.status = true;
    result.msg = msg;

    if (data) {
        result.data = data;
    }
    return result;
}


const failed = (msg) => {
    const result = {
        status: false,
        msg: msg
    }
    return result
}

module.exports = {
    success,
    failed
}