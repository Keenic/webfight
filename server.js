const express = require('express');
const config = require('./server/config/config');
const app = express();
const routes = require('./server/routes/');

app.use(express.static(`${config.appPath}/dist`));
app.use('/', routes.game);

app.listen(config.port, () => {
    console.log(`Server is running on ${config.host}:${config.port}`);
});
