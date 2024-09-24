<template>
  <div class="signup-container">
    <h2>Inscription</h2>
    <form @submit.prevent="signup" class="signup-form">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Mot de passe" />
      <select v-model="role">
        <option disabled value="">Sélectionner un rôle</option>
        <option>super</option>
        <option>admin</option>
        <option>guest</option>
      </select>
      <button type="submit">S'inscrire</button>
    </form>
    <p v-if="message" class="error-message">{{ message }}</p>
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
        const response = await this.$store.dispatch('signup', {
          email: this.email,
          password: this.password,
          role: this.role,
        });
        
        this.message = response.message || 'Inscription OK';
        this.$router.push('/');
      } catch (error) {
        this.message = error.message || 'Inscription KO';
      }
    },
  }
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #28a745;
}

.signup-form input,
.signup-form select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.signup-form button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.signup-form button:hover {
  background-color: #218838;
}

.error-message {
  margin-top: 15px;
  color: red;
}
</style>
