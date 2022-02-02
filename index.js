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
// - [ ] accessory read
// - [ ] accessory create
// - [ ] attach accessory
// implement controllers
// - [x] home (catalog)
// - [x] about
// - [x] details
// - [x] create
// - [ ] improved home (search)
// - [x] edit
// - [x] delete
// - [ ] create accessory
// - [ ] attach accessory to guitar
// - [ ] update details to include accessory
// [ ] add database connection
// [ ] create Guitar model
// [ ] upgrade guitar service to use Guitar model
// [ ] add validation rules to Guitar model
// [ ] create Accessory model

// initial import
const express = require('express');
const handlebars = require('express-handlebars');
const port = 3000;

// controllers import
const { about } = require('./controllers/about');
const create = require('./controllers/create');
const deleteGuitar = require('./controllers/deleteGuitar');
const { details } = require('./controllers/details');
const edit = require('./controllers/edit');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');

const { initDb } = require('./models/index');

// services import
const guitarsService = require('./services/guitars');

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
    app.use(guitarsService());

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

    app.all('*', notFound);

    // initiate the server
    app.listen(port, () => console.log(`Server is running on port ${port}`));

}

start();