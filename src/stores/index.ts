import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

type EEnergy = {name: String, note: number}
export const useEEnergieStore = defineStore('energie-eco', () => {
  const types = reactive([
    {note: 5, name: 'Essence'},
    {note: 9, name: 'Electrique'},
    {note: 6, name: 'Gaz'},
    {note: 4, name: 'Diesel'},
    {note: 7, name: 'Hybride'},
  ] as Array<EEnergy>)

  const getAll = () => types
  const getOne = (key:String):EEnergy => types.find(({name}) => name==key)

  function addOne(payload: EEnergy) {
    types.push(payload)
  }
  
  function delOne(payload: EEnergy) {
    types.splice(types.indexOf(payload),1);
  }

  return { types, getAll, getOne, addOne, delOne }
})

type VKilome = EEnergy & {tag: String, min: number, max: number}
export const useVKilomeStore = defineStore('vehicule-eco', () => {
  const datas = reactive([
    {tag: 'Vehicule', note: 8, name: 'Citadine', min: 800, max: 1300},
    {tag: 'Vehicule', note: 6, name: 'Cabriolet', min: 1300, max: 2000},
    {tag: 'Vehicule', note: 6.5, name: 'Berline', min: 1300, max: 1800},
    {tag: 'Vehicule', note: 4, name: 'SUM/4x4', min: 1500, max: 2500},

    {tag: 'Kilometrage', note: 9, name: '5-10K', min: 5, max: 10},
    {tag: 'Kilometrage', note: 7, name: '10-15K', min: 10, max: 15},
    {tag: 'Kilometrage', note: 5, name: '15-20K', min: 15, max: 20},
    {tag: 'Kilometrage', note: 3, name: '20-25K', min: 20, max: 25},
    {tag: 'Kilometrage', note: 1, name: '25-30K', min: 25, max: 30},

    {tag: 'Annee', note: 1, name: '1960-1970', min: 1960, max: 1970},
    {tag: 'Annee', note: 2, name: '1970-1980', min: 1970, max: 1980},
    {tag: 'Annee', note: 4, name: '1990-2000', min: 1990, max: 2000},
    {tag: 'Annee', note: 5, name: '2000-2010', min: 2000, max: 2010},
    {tag: 'Annee', note: 7, name: '2010-2999', min: 2010, max: Infinity},
  ] as Array<VKilome>)

  const getAll = (key:String) => datas.filter(({tag}) => tag === key)
  const getOne = (key:number, tag:String):VKilome => datas.find(o => o.tag === tag && (o.min <= key && key < o.max))
  const byName = (key:String):VKilome => datas.find(({name}) => name === key)

  function addOne(payload: VKilome) {
    datas.push(payload)
  }
  
  function delOne(payload: VKilome) {
    datas.splice(datas.indexOf(payload),1);
  }

  return { datas, getAll, getOne, addOne, delOne, byName }
})

type BTaux = {score: number, rate: number}
export const useBankTStore = defineStore('bank-taux', () => {
  const rates = reactive([
    {score: 10, rate: +0.0300},
    {score: 15, rate: +0.0274},
    {score: 25, rate: +0.0252},
    {score: 33, rate: +0.0210},
    {score: 40, rate: +0.0185},
  ] as Array<BTaux>)

  const getAll = () => rates
  const getOne = (key:number):BTaux => rates.find(({score}) => key<=score)

  function addOne(payload: BTaux) {
    rates.push(payload)
  }
  
  function delOne(payload: BTaux) {
    rates.splice(rates.indexOf(payload),1);
  }

  return { rates, getAll, getOne, addOne, delOne }
})

export const useBonusTStore = defineStore('bonus-taux', () => {
  const rates = reactive([
    {score: 1, rate: +0.0011},
    {score: 2, rate: -0.0017},
    {score: 3, rate: -0.0029},
    {score: 4, rate: -0.0053},
  ] as Array<BTaux>)

  const getAll = () => rates
  const getOne = (key:Number):BTaux => rates.find(({score}) => score==key)

  function addOne(payload: BTaux) {
    rates.push(payload)
  }
  
  function delOne(payload: BTaux) {
    rates.splice(rates.indexOf(payload),1);
  }

  return { rates, getAll, getOne, addOne, delOne }
})

export type DData = {vehicule: VKilome, energie: EEnergy, kilometre: VKilome, annee: VKilome, passager: BTaux}

