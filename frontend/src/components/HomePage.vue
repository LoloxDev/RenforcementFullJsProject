<template>
  <div>
    <h1>Bienvenue</h1>
    <div v-if="this.$store.getters.isAuthenticated">
      <p>Vous êtes connecté en tant que : {{ this.$store.state.user.email }}</p>
    </div>
    <div v-else>
      <p>Vous n'êtes pas connecté</p>
    </div>
  </div>
</template>
  