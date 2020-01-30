// Listen to port here to allow supertest file to run

const app = require('./server.js');

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
