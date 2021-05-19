var shortid = require("shortid");

module.exports = function (req, res, next) {
    if (!req.cookies.sessionId) {
        var cookieId = shortid.generate();
        res.cookie("sessionId", cookieId, { httpOnly: true });
    }
    next();
};
