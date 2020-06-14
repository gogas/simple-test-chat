<template>
  <div>
    asdad
    <b-input-group>
      <b-form-input></b-form-input>
      <b-input-group-append>
        <b-button variant="outline-success">Button</b-button>
        <b-button variant="info">Button</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
