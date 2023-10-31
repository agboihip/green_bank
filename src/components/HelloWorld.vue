<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Votre <em>simulateur</em> d’emprunt écologique pour l’achat d’une voiture avec
      <a href="https://www.banquepopulaire.fr/valdefrance" target="_blank" rel="noopener">La Banque Populaire VAL DE FRANCE</a>.
      <br/><br/>
      <a href="https://asynconf.fr/#turnament" target="_blank" rel="noopener">Asynconf Hackathon 2023 !</a>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
