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
// - [ ] edit
// - [ ] delete
// implement controllers
// - [ ] home (catalog)
// - [ ] about
// - [ ] details
// - [ ] create
// - [ ] improv ed home (search)
// - [ ] edit
// - [ ] delete

const express = require('express');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');

const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');

const guitarsService = require('./services/guitars');

app.engine('.hbs', handlebars.create({
    extname: '.hbs'
}).engine);

app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static/', express.static('static'));
app.use(guitarsService());

app.get('/', home);
app.get('/about', about);
app.route('/create')
    .get(create.get)
    .post(create.post);
app.get('/details/:id', details);

app.all('*', notFound);

app.listen(port, () => console.log(`Server is running on port ${port}`));