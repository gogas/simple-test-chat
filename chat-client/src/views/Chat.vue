<template>
  <b-container class="bv-example-row">
    <b-row class="text-center">
      <b-col cols="4">
        <user-list @select-user="selectUser"/>
      </b-col>
      <b-col cols="8">
        <div class="chat-msg">
          <div class="messages">
            <div v-for="item in messages">
              <div class="d-flex messages__wrap" :class="item.sender === myId ? 'justify-content-end' : 'justify-content-start'">
                <div class="messages__wrap__item">{{ item.msg }}</div>
              </div>
            </div>
          </div>
          <b-form @submit.stop.prevent="onSubmit" class="form">
            <b-form-group>
              <b-form-input v-model="message"/>
            </b-form-group>

            <b-button type="submit" variant="primary">Отправить сообщение</b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
	import UserList from '@/components/UserList';

	export default {
		name: 'Chat',
		components: {
			UserList
		},
		data: () => ({
			message: null,
      messages: [],
			selectedUser: {},
      myId: null
		}),
		created() {
			this.myId = Math.floor(Math.random() * (1000000 - 10)) + 10;

			this.$socket.client.emit('join', {
				val: 'chat',
				name: localStorage.getItem('userName'),
				id: this.myId
			})
		},
		sockets: {
			'new-msg' (data) {
				if (this.selectedUser.id === data.userId) this.messages.push(data); // if user in chat with selected user
				let msg = localStorage.getItem(data.userId);
				msg ? msg = JSON.parse(msg) : msg = [];
				msg.push(data);
				localStorage.setItem(data.userId, JSON.stringify(msg))
      }
    },
		methods: {
			onSubmit() {
				this.$socket.client.emit('new-chat-msg', {
					msg: this.message,
					userId: this.selectedUser.id,
          sender: this.myId
				});

				this.message = null;
			},
			selectUser(user) {
				this.selectedUser = user;
				let msg = localStorage.getItem(user.id);
				this.messages = msg ? JSON.parse(msg) : [];
			}
		}
	}
</script>

<style lang="scss" scoped>
  .messages__wrap__item {
    color: white;
    background: #007bff;
    padding: 10px;
    border-radius: 10px;
  }

  .chat-msg {
    height: 100vh;
  }

  .messages {
    background: white;
    margin: 0;
    padding: 0.5em 0.5em 0.5em 0.5em;
    position: absolute;
    top: 0.5em;
    left: 0.5em;
    right: 0.5em;
    bottom: 3em;
    overflow: auto;
  }

  .form {
    padding: 0 0.5em 0 0.5em;
    margin: 0;
    position: absolute;
    bottom: 1em;
    left: 0px;
    width: 100%;
    overflow: hidden;
  }
</style>
