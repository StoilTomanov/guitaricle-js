function loginGet(req, res) {
    res.locals = {
        title: "Login",
    }
    res.render('login');
}

function loginPost(req, res) {
    console.log(req.body);
    res.redirect('/');
}

function registerGet(req, res) {
    res.locals = {
        title: "Register",
    }
    res.render('register');
}

function registerPost(req, res) {
    console.log(req.body);

    res.redirect('/');
}

function logout(req, res) {
    res.redirect('/');
}

module.exports = {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    logout
}