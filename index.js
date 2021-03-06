// [x] initialize and configure Express app
// [x] initialize templating lib
// [x] create home controller
// [x] bind routing
// [x] create layout
// create data service
// - [x] read all
// - [x] read one by Id
// - [x] create
// - [ ] search
// - [x] edit
// - [x] delete
// - [x] accessory read
// - [x] accessory create
// - [x] attach accessory
// - [x] register user
// - [x] login user
// - [x] logout user
// - [x] add authorization checks to data modification
// implement controllers
// - [x] home (catalog)
// - [x] about
// - [x] details
// - [x] create
// - [ ] improved home (search)
// - [x] edit
// - [x] delete
// - [x] create accessory
// - [x] attach accessory to guitar
// - [x] update details to include accessory
// - [x] auth controller with login, register, logout actions
// - [x] protect routes
// - [x] only show edit buttons for record owner
// [x] add database connection
// [x] create Guitar model
// [x] upgrade guitar service to use Guitar model
// [x] add validation rules to Guitar model
// [x] create Accessory model
// [x] add session middleware and auth libraries
// [x] create User model
// [x] add owner property to Guitar, Accessory models

// initial import
const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const port = 3000;

// controllers import
const { about } = require('./controllers/about');
const accessory = require('./controllers/createAccessory');
const create = require('./controllers/create');
const deleteGuitar = require('./controllers/deleteGuitar');
const attach = require('./controllers/attachAccessory');
const auth = require('./controllers/auth');
const { details } = require('./controllers/details');
const edit = require('./controllers/edit');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');

const { initDb } = require('./models/index');

const storage = require('./middlewares/storage');
const authService = require('./middlewares/auth');
const { isLoggedIn } = require('./services/util');

const { body } = require('express-validator');

async function start() {
    await initDb();
    // app setup
    const app = express();
    app.engine('.hbs', handlebars.create({
        extname: '.hbs'
    }).engine);

    app.set('view engine', 'hbs');

    app.use(session({
        secret: 'super secret secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' },
    }))
    app.use(express.urlencoded({ extended: true }));
    app.use('/static/', express.static('static'));
    app.use(storage());
    app.use(authService());

    // express router setup
    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);
    app.route('/create')
        .get(isLoggedIn(), create.get)
        .post(isLoggedIn(),
            body('name').notEmpty().withMessage('Name is required'),
            body('price').notEmpty().withMessage('Price is required. If the price is unknown enter 0'),
            create.post);
    app.route('/delete/:id')
        .get(isLoggedIn(), deleteGuitar.deleteGuitarGet)
        .post(isLoggedIn(), deleteGuitar.deleteGuitarPost);
    app.route('/edit/:id')
        .get(isLoggedIn(), edit.editGet)
        .post(isLoggedIn(),
            body('name').notEmpty().withMessage('Name is required'),
            body('price').notEmpty().withMessage('Price is required. If the price is unknown enter 0'),
            edit.editPost);
    app.route('/accessory')
        .get(isLoggedIn(), accessory.accessoryGet)
        .post(isLoggedIn(),
            body('name').notEmpty().withMessage('Name is required'),
            body('price').notEmpty().withMessage('Price is required. If the price is unknown enter 0'),
            accessory.accessoryPost);
    app.route('/attach/:id')
        .get(isLoggedIn(), attach.attachGet)
        .post(isLoggedIn(), attach.attachPost);
    app.route('/login')
        .get(auth.loginGet)
        .post(body('password').trim(),
            body('username').trim(),
            body('username')
            .notEmpty().withMessage('Username is required'),
            body('password')
            .notEmpty().withMessage('Password is required'),
            auth.loginPost);
    app.route('/register')
        .get(auth.registerGet)
        .post(body('username').trim(),
            body('password').trim(),
            body('repeatPassword').trim(),
            body('username')
            .notEmpty().withMessage('Username is required')
            .isLength({ min: 2 }).withMessage('Username must be at least 2 character long')
            .isAlphanumeric().withMessage('Username must contain only letters and numbers'),
            body('password')
            .notEmpty().withMessage('Password required')
            .isLength({ min: 3 }).withMessage('Password must be at least 3 character long'),
            body('repeatPassword')
            .custom((value, { req }) => value == req.body.password).withMessage('Passwords don\'t match'),
            auth.registerPost);
    app.get('/logout', auth.logout);

    app.all('*', notFound);

    // initiate the server
    app.listen(port, () => console.log(`Server is running on port ${port}`));

}

start();