<template>
    <div id="app">
      <nav>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/login">Connexion</router-link></li>
          <li><router-link to="/signup">Inscription</router-link></li>
        </ul>
      </nav>
      <router-view></router-view> <!-- affichage du composant selon la route -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>
  
  <style>
  /* CSS pour tte l'app */
  nav ul {
    list-style: none;
    padding: 0;
  }
  
  nav li {
    display: inline;
    margin-right: 10px;
  }
  
  nav a {
    text-decoration: none;
    color: blue;
  }
  
  nav a:hover {
    text-decoration: underline;
  }
  </style>
  