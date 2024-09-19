<template>
  <div class="container mt-5">
    <h1>Back-Office</h1>
    <div v-if="$store.getters.isAuthenticated">
      <p>Vous êtes connecté en tant que : {{ $store.state.user.email }}</p>

      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="table-dark">
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.email">
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>

                <button class="btn btn-warning btn-sm me-2" @click="editUser(user)">Modifier</button>
                <button class="btn btn-danger btn-sm" @click="deleteUser(user.email)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <p>Vous n'êtes pas connecté</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3000/users/getUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        
        if (!response.ok) {
          throw new Error('Recup users KO');
        }

        const data = await response.json();
        this.users = data;

      } catch (error) {
        console.error('KO:', error);
      }
    },
    // editUser(user) {
    // 
    // },
    // deleteUser(email) {
    // 
    // },
  },
};
</script>

<style scoped>
</style>
