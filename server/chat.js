class Chat {
	constructor(socket, io) {
		this.io = io;
		this.socket = socket;
		this.userList = [
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
		this.init();
	}

	init() {
		this.socket.on('join', data => {
			if (data.val === 'chat') {
				console.log(this.userList)
				this.userList.push(data);
				console.log(this.userList)
				// this.socket.emit('user-list', this.userList);
				this.io.emit('user-list', this.userList);
			}
		});

		this.socket.on('leave', val => {

		});

		this.socket.on('new-chat-msg', val => {

		});
	}
}

module.exports = Chat;
