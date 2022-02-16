const { validationResult } = require("express-validator");

function loginGet(req, res) {
    res.locals = {
        title: "Login",
    }
    res.render('login');
}

async function loginPost(req, res) {
    const { errors } = validationResult(req);

    try {
        if (errors.length > 0) {
            throw errors;
        }
        await req.authService.login(req.body.username, req.body.password);
        res.redirect('/');
    } catch (error) {
        if (error.message != undefined && error.message == 'Incorrect username or password') {
            error = [{
                msg: 'Incorrect username or password',
                param: 'password',
                location: 'body'
            }]
        }
        console.error(error);
        res.render('login', { title: "Login", error, data: { username: req.body.username } });

    }
}

function registerGet(req, res) {
    res.locals = {
        title: "Register",
    }
    res.render('register');
}

async function registerPost(req, res) {
    const { errors } = validationResult(req);

    try {
        if (errors.length > 0) {
            throw errors;
        }
        await req.authService.register(req.body.username, req.body.password);
        res.redirect('/');
    } catch (error) {
        console.error(error)
        res.render('register', { title: "Register", error, data: { username: req.body.username } });
    }
}

function logout(req, res) {
    req.authService.logout();
    res.redirect('/');
}

module.exports = {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    logout
}