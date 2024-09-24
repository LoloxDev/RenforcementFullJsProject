<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/login">Connexion</router-link></li>
          <li><router-link to="/signup">Inscription</router-link></li>
          <li><router-link to="/bo">BackOffice</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>© 2024 ProjectFullJs - By Loris LABARRE</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  color: #333;
  line-height: 1.6;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #007bff;
  padding: 10px 0;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
}

nav li {
  margin: 0 15px;
}

nav a {
  text-decoration: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

nav a:hover {
  color: #ffcc00;
}

main {
  flex-grow: 1;
  padding: 20px;
  text-align: center;
}

footer {
  background-color: #007bff;
  padding: 10px 0;
  text-align: center;
  color: white;
}

@media (max-width: 768px) {
  nav ul {
    flex-direction: column;
  }

  nav li {
    margin: 10px 0;
  }
}
</style>
