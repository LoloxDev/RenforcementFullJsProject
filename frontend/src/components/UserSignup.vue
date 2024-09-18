<template>
    <div>
      <h2>Inscription</h2>
      <form @submit.prevent="signup">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Mot de passe" />
        <select v-model="role">
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
        role: '',
        message: ''
      };
    },
    methods: {
      async signup() {
      try {
        // Envoie les données au store Vuex
        const response = await this.$store.dispatch('signup', {
          email: this.email,
          password: this.password,
          role: this.role,
        });
        
        // Gère la réponse après l'inscription
        this.message = response.message || 'Inscription réussie!';
      } catch (error) {
        this.message = error.message || 'Erreur lors de l\'inscription';
      }
    },
    }
  };
  </script>
  