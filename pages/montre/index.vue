<template>
    <main class="les_montres">
        <h1>Liste des Montres</h1>

        <myButton lien="/montre/creation">Créer ma montre de zéro</myButton>

        <div>
            <label for="boitier_forme">Forme du boitier</label>
            <select class="les_montres--select" name="boitier_forme" id="boitier_forme" v-model="selectedForme">
                <option value="">tous</option>
                <option v-for="b in boitier_forme" :key="b.id_boitier_forme" :value="b.nom">{{ b.nom }}</option>
            </select>
            
            <label for="bracelet_texture">Texture du Bracelet</label>
            <select class="les_montres--select" name="bracelet_texture" id="bracelet_texture" v-model="selectedBracelet">
                <option value="">toutes</option>
                <option v-for="b in bracelet_texture" :key="b.id_bracelet_texture" :value="b.nom">{{ b.nom }}</option>
            </select>
            
            <label for="pierre">Nom de la Pierre</label>
            <select class="les_montres--select" name="pierre" id="pierre" v-model="selectedPierre">
                <option value="">toutes</option>
                <option v-for="p in pierres" :key="p.id_pierre" :value="p.nom">{{ p.nom }}</option>
            </select>
        </div>

        <ul class="les_montres__liste">
            <li v-for="m in listeMontre" class="les_montres__liste--item">
                <myCard v-bind="m"/>
            </li>
        </ul>

        <myButton @click="lessMontre()" v-if="montreMin">Moins de Montre</myButton>
        <myButton @click="moreMontre()" v-if="montreTotal">Plus de Montre</myButton>
    </main>
</template>

<style lang="scss">
.les_montres{
    
    &__liste{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
}
</style>
  
<script setup>
import {API} from '@/utils/axios'

const montres = ref([])

const boitier_forme = ref([])
const selectedForme = ref('')

const bracelet_texture = ref([])
const selectedBracelet = ref('')

const pierres = ref([])
const selectedPierre = ref('')

// récupération de toutes les tables nécéessaires à l'affichage des montres et des filtres
const getMontres = async () => {
    const response = await API.get(`/montre`)
    montres.value = response.data
}

const getBoitier_Forme = async () => {
    const response = await API.get(`/boitier_forme`)
    boitier_forme.value = response.data
}

const getBracelet_Texture = async () => {
    const response = await API.get(`/bracelet_texture`)
    bracelet_texture.value = response.data
}

const getPierre = async () => {
    const response = await API.get(`/pierre`)
    pierres.value = response.data
}

// Filtrer les montres en fonction de la pierre et de la forme sélectionnées
const filteredMontres = computed(() => {
    let filtered = montres.value

    if (selectedForme.value) {
        filtered = filtered.filter(m => m.boitier_forme === selectedForme.value)
    }

    if (selectedBracelet.value) {
        filtered = filtered.filter(m => m.bracelet_texture === selectedBracelet.value)
    }

    if (selectedPierre.value) {
        filtered = filtered.filter(m => m.pierre_nom === selectedPierre.value)
    }

    return filtered
})

// nombre de montre à afficher
const nbrMontre = ref(1)

// augmente le nombre de montre à afficher
const moreMontre = () =>{
    nbrMontre.value++
}

// dimunue le nombre de montre à afficher
const lessMontre = () =>{
    nbrMontre.value--
}

// fonction pour filtrer le nombre de Montre à affiché
const listeMontre = computed(() => {
  if (filteredMontres.value){
    return filteredMontres.value.slice(0, 3*nbrMontre.value)
  } else{
    return []
  }
})

// pour cacher le bouton "plus de montre" si elles sont toutes affichées
const montreTotal = computed(() => {
  return listeMontre.value.length < filteredMontres.value.length
})

// pour cacher le bouton "plus de montre" si elles sont toutes affichées
const montreMin = computed(() => {
  return listeMontre.value.length >+ 3
})

// chargement de la base de données
onMounted(async () => {
  await getMontres()
  await getBoitier_Forme()
  await getBracelet_Texture()
  await getPierre()
})
</script>