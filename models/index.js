const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/guitaricle';

async function initDb() {
    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        mongoose.connection.on('error', (err) => {
            console.error('Database error!');
            console.error(err);
        })
    } catch (error) {
        console.error('Error connecting to database!');
        process.exit(1);
    }
}

module.exports = {
    initDb,
}