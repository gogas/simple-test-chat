<template>
  <div class="d-flex justify-content-center align-items-center login-form">
    <div>
      <b-form @submit.stop.prevent="onSubmit">
        <b-form-group id="example-input-group-1" label="Введите ваше имя" label-for="user-name-id">
          <b-form-input
              id="user-name-id"
              name="user-name-id"
              v-model="$v.form.name.$model"
              :state="validateState('name')"
              aria-describedby="user-name-error"
          />

          <b-form-invalid-feedback id="user-name-error">Вы не ввели ваше имя</b-form-invalid-feedback>
        </b-form-group>

        <b-button type="submit" variant="primary">Войти в чат</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data: () => ({
    form: {
      name: null
    }
  }),
  validations: {
    form: {
      name: {
        required
      }
    }
  },
  methods: {
      validateState(name) {
        const { $dirty, $error } = this.$v.form[name];
        return $dirty ? !$error : null;
      },
    onSubmit () {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;

      localStorage.setItem('userName', this.$v.form.name.$model);
      this.$router.push({ name: 'Chat' })
    }
  }
}
</script>

<style lang="scss">
  .login-form {
    width: 100vw;
    height: 100vh;

    div {
      max-width: 600px;
    }
  }
</style>
