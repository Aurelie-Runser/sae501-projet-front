<template>
    <main>
        <h1>Création d'une Montre</h1>

        <ThreeSeen v-bind="montre"/>

        <ul>
            <li v-for="(m, key) in montre" :key="key">{{ key }} : {{ m }} <br/><br/> </li>
        </ul>

        <hr/>

        <form @submit.prevent="creerMontre" method="post" class="fiche_montre__form">

            <input class="fiche_montre__form--input" type="text" name="nom" id="nom" v-model="montre.nom">

            <input class="fiche_montre__form--input" disabled type="text" name="dernier_modifieur" id="dernier_modifieur" v-model="montre.dernier_modifieur">

            <select class="fiche_montre__form--select" name="boitier_texture" id="boitier_texture" v-model="montre.boitier_texture">
                <option v-for="b in boitier_texture" :key="b.id_boitier_texture" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
            </select>

            <select class="fiche_montre__form--select" name="boitier_forme" id="boitier_forme" v-model="montre.boitier_forme">
                <option v-for="b in boitier_forme" :key="b.id_boitier_forme" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
            </select>

            <select class="fiche_montre__form--select" name="bracelet_texture" id="bracelet_texture" v-model="montre.bracelet_texture">
                <option v-for="b in bracelet_texture" :key="b.id_bracelet_texture" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
            </select>

            <select class="fiche_montre__form--select" name="pierre" id="pierre" v-model="montre.pierre_couleur">
                <option v-for="p in pierre" :key="p.id_pierre" :value="p.couleur" @click="updatePrice">{{ p.nom }}</option>
            </select>

            <input type="color" name="color" id="color" v-model="montre.main_color">

            <select class="fiche_montre__form--select" name="fond_nom" id="fond_nom" v-model="montre.fond_nom">
                <option v-for="f in fond" :key="f.id_fond" :value="f.nom">{{ f.nom }}</option>
            </select>

            <button type="submit">
                <MyButton>Enregistrer la Montre</MyButton>
            </button>

        </form>
    </main>
</template>

<script setup>
import { API } from '@/utils/axios.js'

const router = useRouter()
const montre = ref({
        nom : "",
        dernier_modifieur : "Aurélie",
        boitier_texture : "black01",
        boitier_texture_prix  : 1.99,
        boitier_forme : "boitier_carre",
        boitier_forme_prix : 1.99,
        bracelet_texture : "tissus-marron",
        bracelet_texture_prix  : 1.99,
        pierre_couleur : "#ff0000",
        main_color : "#999999",
        fond_nom : "bois",
        pierre_prix : 100,
        prix_montre : 106.97,
})

const boitier_texture = ref([])
const boitier_forme = ref([])
const bracelet_texture = ref([])
const pierre = ref([])
const fond = ref([])

const message = ref("")

const getBoitier_Texture = async () => {
    const response = await API.get(`/boitier_texure`)
    boitier_texture.value = response.data
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
    pierre.value = response.data
}

const getFond = async () => {
    const response = await API.get(`/fond`)
    fond.value = response.data
}

// modification des prix en fonction des noms de chaque élément
const updatePrice = async () => {
    const BoitierTextureSelect = boitier_texture.value.find(bot => bot.nom === montre.value.boitier_texture )
    const BoitierFormeSelect = boitier_forme.value.find(bot => bot.nom === montre.value.boitier_forme )
    const BraceletTextureSelect = bracelet_texture.value.find(brt => brt.nom === montre.value.bracelet_texture )
    const PierreSelect = pierre.value.find(p => p.couleur === montre.value.pierre_couleur)

    montre.value.boitier_texture_prix = BoitierTextureSelect.prix
    montre.value.boitier_forme_prix = BoitierFormeSelect.prix
    montre.value.bracelet_texture_prix = BraceletTextureSelect.prix 
    montre.value.pierre_prix = PierreSelect.prix

    montre.value.prix_montre = BoitierTextureSelect.prix + BoitierFormeSelect.prix + BraceletTextureSelect.prix + PierreSelect.prix
}

// enregistrement de la montre modifiée dans la base de données
const creerMontre = async () => {
    try {
        const reponse = await API.post(`/montre/add`, montre.value);
        message.value = "Montre créée avec succès"
        router.push(`/montre/${reponse.data.id_montre}`)
    } catch (error) {
        console.error("Erreur lors de la création de la montre :", error.message)
        message.value = "Erreur lors de la création de la montre"
    }
}

onMounted(async () => {
    await getBoitier_Texture()
    await getBoitier_Forme()
    await getBracelet_Texture()
    await getPierre()
    await getFond()
})

</script>