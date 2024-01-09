<template>
    <main class="fiche_montre">
        <h1>La Montre</h1>

        <ul>
            <li v-for="(m, key) in montrePreview" :key="key">{{ key }} : {{ m }} <br/><br/> </li>
        </ul>

        <hr/>

        <form @submit.prevent="modifierMontre" method="put" class="fiche_montre__form">

            <input class="fiche_montre__form--input" type="text" name="nom" id="nom" v-model="montrePreview.nom">

            <input class="fiche_montre__form--input" disabled type="text" name="dernier_modifieur" id="dernier_modifieur" v-model="montrePreview.dernier_modifieur">

            <select class="fiche_montre__form--select" name="boitier_texture" id="boitier_texture" v-model="montrePreview.boitier_texture">
                <option v-for="b in boitier_texture" :key="b.id_boitier_texture" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
            </select>
            
            <select class="fiche_montre__form--select" name="boitier_forme" id="boitier_forme" v-model="montrePreview.boitier_forme">
                <option v-for="b in boitier_forme" :key="b.id_boitier_forme" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
            </select>

            <select class="fiche_montre__form--select" name="bracelet_texture" id="bracelet_texture" v-model="montrePreview.bracelet_texture">
                <option v-for="b in bracelet_texture" :key="b.id_bracelet_texture" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
            </select>
            
            <select class="fiche_montre__form--select" name="pierre" id="pierre" v-model="montrePreview.pierre_nom">
                <option v-for="p in pierre" :key="p.id_pierre" :value="p.nom" @click="updatePrice">{{ p.nom }}</option>
            </select>

            <button type="submit">
                <MyButton>Enregistrer les Modifications</MyButton>
            </button>

        </form>
        <MyButton color="black" @click="supp = true">Supprimer</MyButton>

        <p>{{ message }}</p>

        <div v-if="supp" class="fiche_montre__popup-supp">
            <p>Vous êtes sur de vouloir supprimer cette montre ? Cette action est irréversible.</p>

            <MyButton @click="supp = false">Non, je la laisse</MyButton>
            <MyButton color="black" @click="supprimerMontre">Oui, je veux la supprimer</MyButton>
        </div>

    </main>
</template>

<style lang="scss">
.fiche_montre{

    &__popup-supp{
        position: fixed;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 700px;
        height: 300px;
        padding: $m-medium;
        background: $color-white;
        border: 2px solid $color-main;
        border-radius: 10px;
    }
}
</style>

<script setup>
import { API } from '@/utils/axios.js'

const route = useRoute()
const router = useRouter()
const montre = ref([])
const montrePreview = ref({})

const boitier_texture = ref([])
const boitier_forme = ref([])
const bracelet_texture = ref([])
const pierre = ref([])

const message = ref("")
const supp = ref(false)

// récupérations des tables pour afficher la montre et tous les paramètres
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

const getBracelet_Texture = async () => {
    const response = await API.get(`/bracelet_texture`)
    bracelet_texture.value = response.data
}

const getPierre = async () => {
    const response = await API.get(`/pierre`)
    pierre.value = response.data
}

// modification des prix en fonction des noms de chaque élément
const updatePrice = async () => {
    const BoitierTextureSelect = boitier_texture.value.find(bot => bot.nom === montre.value.boitier_texture )
    const BoitierFormeSelect = boitier_forme.value.find(bot => bot.nom === montre.value.boitier_forme )
    const BraceletTextureSelect = bracelet_texture.value.find(brt => brt.nom === montre.value.bracelet_texture )
    const PierreSelect = pierre.value.find(p => p.nom === montre.value.pierre_nom)

    montre.value.boitier_texture_prix = BoitierTextureSelect.prix
    montre.value.boitier_forme_prix = BoitierFormeSelect.prix
    montre.value.bracelet_texture_prix = BraceletTextureSelect.prix 
    montre.value.pierre_prix = PierreSelect.prix

    montre.value.prix_montre = BoitierTextureSelect.prix + BoitierFormeSelect.prix + BraceletTextureSelect.prix + PierreSelect.prix
}

// enregistrement de la montre modifiée dans la base de données
const modifierMontre = async () => {
    try {
        await API.put(`/montre/${route.params.id}/modif`, montrePreview.value);
        message.value = "Montre modifiée avec succès"
    } catch (error) {
        console.error("Erreur lors de la modification de la montre :", error.message)
        message.value = "Erreur lors de la modification de la montre"
    }
}

// suppression de la montre dans la base de données
const supprimerMontre = async () => {
    try {
        await API.delete(`/montre/${route.params.id}/supp`);
        message.value = "Montre supprimée avec succès";
        router.push('/montre')
    } catch (error) {
        console.error("Erreur lors de la suppression de la montre :", error.message)
        message.value = "Erreur lors de la suppression de la montre"
    }
}

onMounted(async () => {
    await getMontre()
    await getBoitier_Texture()
    await getBoitier_Forme()
    await getBracelet_Texture()
    await getPierre()
})

</script>