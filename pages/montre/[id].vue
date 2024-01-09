<template>
    <main>
        <h1>La Montre</h1>

        <ul>
            <li v-for="(m, key) in montrePreview" :key="key">{{ key }} : {{ m }} <br/><br/> </li>
        </ul>

        <hr/>

        <form @submit.prevent="modifierMontre" method="put">

            <input type="text" name="nom" id="nom" v-model="montrePreview.nom">

            <input type="text" name="dernier_modifieur" id="dernier_modifieur" v-model="montrePreview.dernier_modifieur">

            <select name="boitier_texture" id="boitier_texture" v-model="montrePreview.boitier_texture">
                <option v-for="b in boitier_texture" :key="b.id_boitier_texture" :value="b.nom">{{ b.nom }}</option>
            </select>
          
            <select name="boitier_forme" id="boitier_forme" v-model="montrePreview.boitier_forme">
                <option v-for="b in boitier_forme" :key="b.id_boitier_forme" :value="b.nom">{{ b.nom }}</option>
            </select>

            <input type="submit" value="Modifié" />
        </form>

        <p>{{ message }}</p>

    </main>
</template>

<script setup>
import myButton from "@/components/myButton.vue"

import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { API } from '@/utils/axios.js'

const route = useRoute()
const montre = ref([])
const montrePreview = ref({})

const boitier_texture = ref([])
const boitier_forme = ref([])

const message = ref("")

const getMontre = async () => {
    const response = await API.get(`/montre/${route.params.id}`)
    montre.value = response.data[0]
    montrePreview.value = response.data[0]
}

const getBoitier_Texture = async () => {
    const response = await API.get(`/boitier_texure`)
    boitier_texture.value = response.data
}

const getBoitier_Forme = async () => {
    const response = await API.get(`/boitier_forme`)
    boitier_forme.value = response.data
}

// const getMontreModif = async () => {
//     const response = await API.get(`/montre/${route.params.id}/modif`)
//     return response.data
// }

// const getMontreSupp = async () => {
//     const response = await API.get(`/montre/${route.params.id}/supp`)
//     return response.data
// }

const modifierMontre = async () => {
    try {
        await API.put(`/montre/${route.params.id}/modif`, montrePreview.value);
        message.value = "Montre modifiée avec succès"
    } catch (error) {
        console.error("Erreur lors de la modification de la montre :", error.message)
        message.value = "Erreur lors de la modification de la montre"
    }
}

onMounted(async () => {
    await getMontre()
    await getBoitier_Texture()
    await getBoitier_Forme()
})

</script>