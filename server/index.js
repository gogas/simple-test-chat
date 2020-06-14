
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const chat = require('./chat');

const userList = [
	{
		name: 'Окладников',
		id: 1,
		status: 'offline'
	},
	{
		name: 'Константин',
		id: 2,
		status: 'offline'
	},
	{
		name: 'Игорь',
		id: 3,
		status: 'offline'
	},
	{
		name: 'Владислав',
		id: 4,
		status: 'offline'
	}
];

io.on('connection', function(socket){
	socket.on('join', data => {
		if (data.val === 'chat') {
			if (!userList.find(x => x.id === socket.id)) {
				userList.push({
					id: socket.id,
					...data
				});
			}
			io.emit('user-list', userList);
		}
	});

	socket.on('new-chat-msg', data => {
		io.emit('new-msg', data)
	});
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});
