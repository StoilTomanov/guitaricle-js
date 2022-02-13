const { register, login } = require('../services/auth');

module.exports = () => (req, res, next) => {
    if (req.session.user) {
        res.userStatus = {
            user: req.session.user,
            hasUser: true,
        };

    }
    console.log('mid', res.locals);
    req.authService = {
        register: (...params) => register(req.session, ...params),
        login: (...params) => login(req.session, ...params),
    }

    next();
}