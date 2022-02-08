function loginGet(req, res) {
    res.locals = {
        title: "Login",
    }
    res.render('login');
}

function loginPost(req, res) {

}

function registerGet(req, res) {
    res.locals = {
        title: "Register",
    }
    res.render('register');
}

function registerPost(req, res) {

}

function logout(req, res) {

}

module.exports = {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    logout
}