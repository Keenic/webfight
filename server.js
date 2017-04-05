const express = require('express');
const config = require('./server/config/config');
const app = express();
const routes = require('./server/routes/');

const server = require('http').Server(app);
const io = require('socket.io')(server);
const ioFight = io.of('/fight');

server.listen(config.port, () => {
    console.log(`Server is running on ${config.host}:${config.port}`);
});

app.use(express.static(`${config.appPath}/dist`));
app.use('/', routes.game);

let clients = {};
let players = [];

ioFight.on('connection', (socket) => {
    const clientId = socket.client.id;
    let playerNo = 0;
    clients[clientId] = socket.client;

    // Emit player's id
    socket.emit('connected', {clientId: clientId});

    // On player fight join get his number
    socket.on('joinningFight', (data) => {
        if (!players.length) {
            playerNo = 1;
        } else if (players.length) {
            const player1 = players.find(el => el.playerNo === 1);
            const player2 = players.find(el => el.playerNo === 2);
            if (!player1) {
                playerNo = 1;
            } else if (!player2) {
                playerNo = 2;
            }
        }
        const player = {
            clientId: data.clientId,
            playerNo: playerNo
        };
        players.push(player);
        socket.emit('joinedFight', player)
    });

    socket.on('playerPosition', (data) => {
        const playerData = {
            playerNo: playerNo,
            position: data.position
        };
        socket.broadcast.emit('enemyPlayerMove', playerData);
    });
    socket.on('disconnect', () => {
        delete clients[clientId];
        players = players.filter((el) => el.clientId !== clientId);
    });
});
