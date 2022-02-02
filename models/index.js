const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/guitaricle';

async function initDb() {
    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database error!');
            console.error(err);
            console.log('error 1 appears');
        })
    } catch (error) {
        console.error('Error connecting to database!');
        console.log('error 2 appears');
        process.exit(1);
    }
}

module.exports = {
    initDb,
}