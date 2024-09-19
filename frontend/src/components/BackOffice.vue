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

      <!-- Popup édit -->
      <div v-if="userToEdit" class="mt-4">
        <h3>Modifier l'utilisateur : {{ userToEdit.email }}</h3>
        <form @submit.prevent="updateUser">
          <div class="mb-3">
            <label for="role" class="form-label">Role</label>
            <select v-model="userToEdit.role" class="form-select">
              <option value="admin">Admin</option>
              <option value="super">Super</option>
              <option value="guest">Guest</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Mettre à jour</button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancelEdit">Annuler</button>
        </form>
      </div>
      <!-- --------- -->


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
      userToEdit: null,
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

    async deleteUser(email) {
      try {
        const response = await fetch(`http://localhost:3000/users/deleteUser/${email}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error('Suppression KO');
        }

        this.users = this.users.filter(user => user.email !== email);
        alert('Utilisateur supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Suppression KO');
      }
    },

    editUser(user) {
      this.userToEdit = { ...user };
    },

    cancelEdit() {
      this.userToEdit = null;
    },

    async updateUser() {
      try {
        const response = await fetch(`http://localhost:3000/users/updateUser/${this.userToEdit.email}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ role: this.userToEdit.role }),
        });

        if (!response.ok) {
          throw new Error('Mise à jour user KO');
        }

        this.users = this.users.map(user => {
          if (user.email === this.userToEdit.email) {
            return { ...user, role: this.userToEdit.role };
          }
          return user;
        });

        alert('Utilisateur mis à jour OK');
        this.userToEdit = null;
      } catch (error) {
        console.error('Update user KO:', error);
        alert('Update user KO:');
      }
    }
  },
};
</script>

<style scoped>
</style>
