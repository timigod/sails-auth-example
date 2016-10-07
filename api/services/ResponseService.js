/**
 * ResponseService.js
 */
module.exports = {
    json: function (status, res, message, data, meta) {
        var response = {
            response: {
                message: message
            }
        };
        if (typeof data !== 'undefined') {
            response.response.data = data;
        }
        if (typeof meta !== 'undefined') {
            response.response.meta = meta;
        }
        return res.status(status).json(response);
    }
};
