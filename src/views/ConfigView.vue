<script setup lang="ts">
import {
  useEEnergieStore, useVKilomeStore,
  useBankTStore,useBonusTStore} 
from '../stores'

const {types, getOne} = useEEnergieStore();
const {datas, getAll} = useVKilomeStore();

const vehis = getAll('Vehicule');

const kilos = getAll('Kilometrage');

const years = getAll('Annee');

const {rates, addOne } = useBankTStore();
const {rates: bonus, } = useBonusTStore();

</script>

<template>
  <div class="about">
    <h1>Type Véhicule</h1>
    <div v-for="(type,i) in vehis" :key="i">{{ type.name }} #{{ type.note }}</div>
    <h1>Energie Véhicule</h1>
    <div v-for="(type,i) in types" :key="i">{{ type.name }} #{{ type.note }}</div>
    <h1>Kilométrage Véhicule</h1>
    <div v-for="(type,i) in kilos" :key="i">{{ type.name }} #{{ type.note }}</div>
    <h1>Année Véhicule</h1>
    <div v-for="(type,i) in years" :key="i">{{ type.name }} #{{ type.note }}</div>
    <h1>Banque Taux</h1>
    <div v-for="(type,i) in rates" :key="i">{{ type.score }} #{{ type.rate }}</div>
    <h1>Bonus Taux</h1>
    <div v-for="(type,i) in bonus" :key="i">{{ type.score }} #{{ type.rate }}</div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-flow: column;
  }
}
</style>
../stores