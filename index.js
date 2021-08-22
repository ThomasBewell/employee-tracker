const connection = require('./src/config/config');
const actions = require('./src/lib/actions');

// Start app
const init = async () => {
    console.log('Welcome to Employee Tracker. Select an action to get started.');
    try {
        await actions.start();
    } catch (err) {
        console.log(err);
    }
}

// Connect to database
connection.connect((err) => {
    if (err) throw err;
    init();
});