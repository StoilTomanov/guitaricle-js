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
// - [ ] register user
// - [ ] login user
// - [ ] logout user
// - [ ] add authorization checks to data modification
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
// - [ ] auth controller with login, register, logout actions
// - [ ] protect routes
// - [ ] only show edit buttons for record owner
// [x] add database connection
// [x] create Guitar model
// [x] upgrade guitar service to use Guitar model
// [x] add validation rules to Guitar model
// [x] create Accessory model
// [ ] add session middleware and auth libraries
// [ ] create User model
// [ ] add owner property to Guitar, Accessory models

// initial import
const express = require('express');
const handlebars = require('express-handlebars');
const port = 3000;

// controllers import
const { about } = require('./controllers/about');
const accessory = require('./controllers/createAccessory');
const create = require('./controllers/create');
const deleteGuitar = require('./controllers/deleteGuitar');
const attach = require('./controllers/attachAccessory');
const { details } = require('./controllers/details');
const edit = require('./controllers/edit');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');

const { initDb } = require('./models/index');

const storage = require('./middlewares/storage');

async function start() {
    await initDb();
    // app setup
    const app = express();
    app.engine('.hbs', handlebars.create({
        extname: '.hbs'
    }).engine);

    app.set('view engine', '.hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use('/static/', express.static('static'));
    app.use(storage());

    // express router setup
    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);
    app.route('/create')
        .get(create.get)
        .post(create.post);
    app.route('/delete/:id')
        .get(deleteGuitar.deleteGuitarGet)
        .post(deleteGuitar.deleteGuitarPost);
    app.route('/edit/:id')
        .get(edit.editGet)
        .post(edit.editPost);
    app.route('/accessory')
        .get(accessory.accessoryGet)
        .post(accessory.accessoryPost);
    app.route('/attach/:id')
        .get(attach.attachGet)
        .post(attach.attachPost);

    app.all('*', notFound);

    // initiate the server
    app.listen(port, () => console.log(`Server is running on port ${port}`));

}

start();