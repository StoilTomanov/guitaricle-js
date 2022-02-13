function loginGet(req, res) {
    res.locals = {
        title: "Login",
    }
    res.render('login');
}

async function loginPost(req, res) {
    try {
        await req.authService.login(req.body.username, req.body.password);
        res.redirect('/');
    } catch (error) {
        console.error(error.message);
        res.redirect('/login');
    }
}

function registerGet(req, res) {
    res.locals = {
        title: "Register",
    }
    res.render('register');
}

async function registerPost(req, res) {
    if (req.body.username == '' || req.body.password == '') {
        res.redirect('/register');
        return;
    }

    if (req.body.password != req.body.repeatPassword) {
        res.redirect('/register');
        return;
    }
    try {
        await req.authService.register(req.body.username, req.body.password);
        res.redirect('/');
    } catch (error) {
        console.error(error.message)
        res.redirect('/register');

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