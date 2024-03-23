<template>
    <main class="compte">
        <myTitle>Mon Compte</myTitle>

        <div v-if="!isChargingPanier && !isChargingPanier">
            <section class="compte__section">
                <h2>Mes Montres</h2>
                <gridCard :valeurMontres="mesMontres"/>
                <p v-if="mesMontres.length == 0" class="compte__section--texte">Vous n'avez créé aucune montre.</p>
    
                <myButton class="compte__bouton" lien="/montre/creation">Créer une montre</myButton>
            </section>
    
            <hr class="compte__deco"/>
            
            <section class="compte__section">
                <h2>Mon Panier</h2>
                <gridCard :valeurMontres="monPanier"/>
                <p v-if="monPanier.length == 0" class="compte__section--texte">Votre panier est vide.</p>
                
                <myButton v-if="monPanier.length != 0" class="compte__bouton" @click="suppPanier = 'acheter'">Acheter mon panier</myButton>
                <myButton v-if="monPanier.length != 0" color="black" class="compte__bouton"  @click="suppPanier = 'vider'">Vider mon panier</myButton>
    
                <div v-if="suppPanier.length != 0" class="compte__popup compte__popup--acheter">
                    <p v-if="suppPanier == 'acheter'">Votre commande a été passée avec succès.</p>
                    <p v-if="suppPanier == 'acheter'">Merci de votre commande !</p>
    
                    <p v-if="suppPanier == 'vider'">Votre panier a été vidé avec succès.</p>
    
                    <myButton @click="videPanier()">Ok</myButton>
                </div>
            </section>
    
            <hr class="compte__deco"/>
    
            <myButton class="compte__bouton" @click="deconnexion" color="black">Je me déconnecte</myButton>
        </div>

        <div v-else>
            <loader/>
        </div>
    </main>
</template>

<style lang="scss">
.compte{
    padding-top: 5rem;
    padding-bottom: 5rem;
    overflow: hidden;

    &__section{
        margin: $m-big 0;

        &--texte{
            margin: $m-medium auto;
            text-align: center;
            font-size: $font_size-litle;
        }
    }

    &__deco{
        display: block;
        flex: none;
        width: 100%;
        height: 2px;
        border: none;
        border-radius: 100%;
        background: $color-main;
    }

    &__bouton{
        width: fit-content;
        margin: auto;
        margin-top: $m-big;
    }

    &__popup{
        position: fixed;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        width: 700px;
        max-width: 100%;
        height: 300px;
        padding: $m-small;
        background: $color-white;
        border: 2px solid $color-main;
        border-radius: 10px;

        p{
            font-size: $font_size-litle;
            font-weight: $font_weight-medium;
            text-align: center;
        }
    }

    @include small{
        margin-top: 0;

        &__popup{
            padding: $m-medium;
        }
    }
}
</style>
  
<script setup>
import { API } from '@/utils/axios.js'

const router = useRouter()

const mesMontres = ref([])
const monPanier = ref([])
const suppPanier = ref("")

const store = useGlobalStore()
const isChargingMontres = ref(true)
const isChargingPanier = ref(true)

// récupérations des tables pour afficher la montre et tous les paramètres
const getMontres = async () => {
    const response = await API.get(`/user/${store.token}`)
    mesMontres.value = response.data
    isChargingMontres.value = false
}

// récupérations des tables pour afficher la montre et tous les paramètres
const getPanier = async () => {
    const response = await API.get(`/user/${store.token}/panier`)
    monPanier.value = response.data
    isChargingPanier.value = false
}

// enregistrement de la montre modifiée dans la base de données
const deconnexion = async () => {
    store.clearToken() // Enregistrer le token dans le store Pinia
    router.push('/login')
}

// vider le panier
const videPanier = async () => {
    try {
        await API.delete(`/user/panier/supp/${store.token}`);
        await getPanier()
        suppPanier.value = ""
    } catch (error) {
        console.error("Erreur lors de la suppression du panier :", error.message)
        message.value = "Erreur lors de la suppression du panier."
    }
}

onMounted(async () => {
    await getMontres()
    await getPanier()
})

definePageMeta({
  middleware: [
    function (to, from) {
    },
    'auth',
  ],
});
</script>