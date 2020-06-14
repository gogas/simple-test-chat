<template>
  <b-list-group class="users">
    <b-list-group-item :active="item.active" :key="item.id" @click="selectUser(item, index)" class="d-flex align-items-center justify-content-start users__item" v-for="(item, index) in userList">
      <div :class="{ 'online': item.online }" class="users__item__status"></div>
      <span>{{ item.name }}</span>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
	export default {
		name: 'UserList',
		data: () => ({
			userList: []
		}),
		sockets: {
			'user-list'(data) {
				this.userList = data
			},
      'new-chat-user' (data) {
        this.userList.push(data);
      }
		},
		methods: {
			selectUser(user, i) {
				const oldUserIndex = this.userList.findIndex(x => x.active);
        if (oldUserIndex > -1) this.setActiveUser(oldUserIndex, false);
				this.setActiveUser(i, true);

				this.$emit('select-user', user);
			},
      setActiveUser (i, val) {
	      this.$set(this.userList[i], 'active', val);
      }
		}
	}
</script>

<style lang="scss" scoped>
  .users {
    &__item {
      span {
        display: block;
        margin-left: 10px;
      }

      &__status {
        width: 10px;
        height: 10px;
        background: red;
        border-radius: 50%;

        .online {
          background: green;
        }
      }
    }
  }
</style>
