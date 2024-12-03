const { clearCache } = require("../services/cache");

module.exports = async (req, _, next) => {
	await next();
	clearCache(req.user.id);
};
