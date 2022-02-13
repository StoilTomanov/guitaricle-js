const { register, login, logout } = require('../services/auth');

module.exports = () => (req, res, next) => {
    if (req.session.user) {
        res.userStatus = {
            user: req.session.user,
            hasUser: true,
        };

    }
    req.authService = {
        register: (...params) => register(req.session, ...params),
        login: (...params) => login(req.session, ...params),
        logout: () => logout(req.session),
    }

    next();
}