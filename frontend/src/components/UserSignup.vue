<template>
    <div>
      <h2>Inscription</h2>
      <form @submit.prevent="signup">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Mot de passe" />
        <select v-model="selected">
          <option disabled value="">Rôle</option>
          <option>super</option>
          <option>admin</option>
          <option>guest</option>
        </select>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        selected: '',
      };
    },
    methods: {
      signup() {
        // envoie les données d'inscription sur store vuex
        this.$store.dispatch('signup', { email: this.email, password: this.password });
      }
    }
  };
  </script>
  