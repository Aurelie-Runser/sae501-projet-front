<template>
    <main class="crea_montre">
        <myTitle>Création d'une montre</myTitle>
        
        <div class="crea_montre__rendu">
            <div class="crea_montre__rendu--model">
                <ThreeSeen v-bind="montre"/>
            </div>

            <ul class="crea_montre__rendu--infos">
                <li class="info info__nom">{{ montre.nom }}</li>

                <li class="info">
                    Bracelet Texture (<span class="info__valeur">{{ montre.bracelet_texture }}</span>) :
                    <span class="info__prix">{{ montre.bracelet_texture_prix }} €</span>
                </li>
                <li class="info">
                    Boitier Texture (<span class="info__valeur">{{ montre.boitier_texture }}</span>) :
                    <span class="info__prix">{{ montre.boitier_texture_prix }} €</span>
                </li>
                <li class="info">
                    Boitier Forme (<span class="info__valeur">{{ montre.boitier_forme }}</span>) :
                    <span class="info__prix">{{ montre.boitier_forme_prix }} €</span>
                </li>
                <li class="info">
                    Pierre (<span class="info__valeur">{{ montre.pierre_nom }}</span>) :
                    <span class="info__prix">{{ montre.prix_montre }} €</span>
                </li>
                <li class="info">
                    Prix total : <span class="info__prix">{{ montre.prix_montre }} €</span>
                </li>

                <li class="info info__message">
                    <p v-if="message">{{ message }}</p>
                    <p v-else>(Enregistrez cette montre pour pouvoir l'ajouter à votre panier)</p>
                </li>
            </ul>
        </div>

        <form @submit.prevent="creerMontre" method="post" class="crea_montre__form">

            <div class="crea_montre__form--input">
                <label for="nom">Nom de la Montre</label>
                <input class="crea_montre__form--input" type="text" name="nom" id="nom" v-model="montre.nom">
            </div>

            <div class="crea_montre__form--input">
                <label for="dernier_modifieur">Pseudo du créateur</label>
                <input class="crea_montre__form--input" disabled type="text" name="dernier_modifieur" id="dernier_modifieur" v-model="montre.dernier_modifieur">
            </div>

            <div class="crea_montre__form--input">
                <label for="boitier_texture">Texture du Boitier</label>
                <select class="crea_montre__form--select" name="boitier_texture" id="boitier_texture" v-model="montre.boitier_texture">
                    <option v-for="b in boitier_texture" :key="b.id_boitier_texture" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
                </select>
            </div>

            <div class="crea_montre__form--input">
                <label for="boitier_forme">Forme du Boitier</label>
                <select class="crea_montre__form--select" name="boitier_forme" id="boitier_forme" v-model="montre.boitier_forme">
                    <option v-for="b in boitier_forme" :key="b.id_boitier_forme" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
                </select>
            </div>

            <div class="crea_montre__form--input">
                <label for="bracelet_texture">Texture du Bracelet</label>
                <select class="crea_montre__form--select" name="bracelet_texture" id="bracelet_texture" v-model="montre.bracelet_texture">
                    <option v-for="b in bracelet_texture" :key="b.id_bracelet_texture" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
                </select>
            </div>

            <div class="crea_montre__form--input">
                <label for="pierre">Pierre Préciseuse</label>
                <select class="crea_montre__form--select" name="pierre" id="pierre" v-model="montre.pierre_couleur">
                    <option v-for="p in pierre" :key="p.id_pierre" :value="p.couleur" @click="updatePrice">{{ p.nom }}</option>
                </select>
            </div>

            <div class="crea_montre__form--input">
                <label for="main_color">Couleur</label>
                <input type="color" name="main_color" id="main_color" v-model="montre.main_color">
            </div>

            <div class="crea_montre__form--input">
                <label for="fond_nom">Fond</label>
                <select class="crea_montre__form--select" name="fond_nom" id="fond_nom" v-model="montre.fond_nom">
                    <option v-for="f in fond" :key="f.id_fond" :value="f.nom">{{ f.nom }}</option>
                </select>
            </div>

            <input class="crea_montre__form--bouton" type="submit" value="Enregistrer cette Montre"/>

        </form>
    </main>
</template>

<style lang="scss">
.crea_montre{

    &__rendu{
        display: flex;
        gap: $m-litle;

        &--infos{
            display: flex;
            flex-direction: column;
            gap: $m-small;
            margin: auto;
           
            
            .info{

                &__nom{
                    font-size: $font-size-regular;
                    font-weight: $font_weight-bold;
                    margin-bottom: $m-small;
                }

                &__valeur{
                    font-weight: $font-weight-medium;
                }

                &__prix{
                    color: $color-main;
                    font-weight: $font-weight-semibold;
                }

                &__message{
                    max-width: 80%;
                    margin: $m-small auto;
                    font-weight: $font_weight-bold;
                    color: $color-main;
                    text-align: center;
                }
            }
        }
        
        &--model{
            width: 66%;
        }
    }

    &__form{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: $m-litle 0;

        &--input{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        &--bouton{
            margin: $m-litle auto;
        }
    }
}
</style>

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
        pierre_nom : "rubis",
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

definePageMeta({
  middleware: [
    function (to, from) {
    },
    'auth',
  ],
});
</script>