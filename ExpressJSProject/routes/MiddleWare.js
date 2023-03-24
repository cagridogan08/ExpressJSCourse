const accessControl = (req, res, next) => {
    const access = false;
    if (!access) {
        res.status(401).json({
            success: false,
            message:"You Are Not Authorized"
        });
    }
    console.log("Middleware access control");
    next();
};
const defaultMiddleware = (req, res, next) => {
    console.log("Default Middleware");
};
module.exports = {
    accessControl: accessControl,
    defaultMiddleWare:defaultMiddleware
};