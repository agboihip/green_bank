<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import ToolingIcon from './icons/IconTooling.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

import { type DData,
  useEEnergieStore, useVKilomeStore,
  useBankTStore,useBonusTStore} 
from '../stores'
import {computed,ref,reactive} from 'vue'

const bankTStore = useBankTStore();
const bonusTStore = useBonusTStore();
const {types, getOne: getEne} = useEEnergieStore();
const {getAll,getOne, byName} = useVKilomeStore();

const vehis = computed(() => getAll('Vehicule'));
const bonus = computed(() => bonusTStore.rates)

const respData = ref<{score?:number, bank?:number, bonus?:number, total?:number}>({})
const formData = reactive({
  vehicule: 'Citadine',
  energie: 'Electrique', 
  kilometre:25, 
  annee:2003,
  passager:1
})
function handleSubmit() {
  const ok:DData = {
    vehicule: byName(formData.vehicule),
    energie: getEne(formData.energie), 
    annee: getOne(formData.annee, 'Annee'), 
    kilometre: getOne(formData.kilometre, 'Kilometrage'),
    passager: bonusTStore.getOne(formData.passager)
  }
  respData.value = compute(ok)
}

function compute(payload: DData) {
    if(payload.annee) {
      const bonus = payload.passager.rate
      const score = (
        payload.vehicule.note + 
        payload.energie.note + 
        payload.kilometre?.note + 
        payload.annee?.note
      )
      const bank =  bankTStore.getOne(score)?.rate
      return {score, bank, bonus, total: bank+bonus}
    } else return {score: -1}
}
</script>

<template>
  <FormKit type="form" @submit="handleSubmit" #default="{state: { valid }}" :actions="false"> 
    <WelcomeItem>
      <template #icon><ToolingIcon /></template>
      <template #heading>Véhicule</template>
      <FormKit
          type="select"
          name="vehicule"
          label="Type"
          validation="required"
          v-model="formData.vehicule"
          placeholder="Choisir le type de véhicule"
          :options="vehis.map(o=>({label: `${o.name}(${o.min}-${o.max})`, value: o.name}))"
      />
      <FormKit
        type="select"
        name="energie"
        label="Energie"
        validation="required"
        v-model="formData.energie"
        placeholder="Choisir l'energie du véhicule"
        :options="types.map(o=>({label: `${o.name}(${o.note})`, value: o.name}))"
      />
      <FormKit number
        type="number"
        name="kilometre"
        label="Kilometrage"
        validation="required|min:5|max:30"
        v-model="formData.kilometre"
        help="Le kilométrage est donné en K/km (soit 1000/km)"
        placeholder="Entrer le kilometrage en Kilo/km"
      />
      <FormKit
        type="number"
        name="annee"
        label="Année"
        number="integer"
        validation="required|min:1960"
        v-model="formData.annee"
        placeholder="Entrer l'année du véhicule"
      />
    </WelcomeItem> 

    <WelcomeItem>
      <template #icon> <CommunityIcon /></template>
      <template #heading>Banque</template>
      <FormKit
          type="radio"
          name="passager"
          label="Passager"
          validation="required"
          v-model="formData.passager"
          placeholder="Choisir le nombre de passager"
          :options="bonus.map(o=>({label: o.score, value: o.score}))"
      /><br/>
      <FormKit type="submit" :disabled="!valid" />
    </WelcomeItem>

    <WelcomeItem>
      <template #icon><SupportIcon /></template>
      <template #heading>Résultat ({{ respData.score }}/40)</template>

      <div v-if="!respData.score"></div>
      <div v-else-if="respData.score == -1">Désolé, invalide année saisie</div>
      <div v-else>L'Emprunteur devra donc payer <code>{{respData.total*100}}%</code> de frais pour cet emprunt car le véhicule {{ formData.vehicule }} {{ formData.energie }} datant de {{ formData.annee }} va rouler {{formData.kilometre*1000}} km / an pour <span v-if="formData.passager >1">{{ formData.passager }} personnes</span><span v-else>1 seule personne</span></div>
    </WelcomeItem>
  </FormKit>
</template>