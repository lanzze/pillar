<template>
  <div id="module:login.login">
    Will come to login!
    <div>
      Name:<input v-model="account.username"/>
    </div>
    <div>
      Password:<input v-model="account.password" type="password">
    </div>
    <div>
      <input type="button" @click="jump" value="SUBMIT"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      account: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    jump() {
      this.$agent.fetch("login.login-by-account", this.account).then(data => {
        this.$store.update("user", data);
        this.$router.push("/index");
      }).catch(error => {
        this.$store.update("user", {});
        this.$router.push("/index");
      }).finally(() => {})
    }
  }
}
</script>