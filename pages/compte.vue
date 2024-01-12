<template>
    <main class="compte">
        <myTitle>Mon Compte</myTitle>

        <section class="compte__section">
            <h2>Mes Montres</h2>
            <gridCard :valeurMontres="mesMontres"/>
            <p v-if="mesMontres.length == 0" class="compte__section--texte">Vous n'avez créé aucune montre.</p>
        </section>

        <hr class="compte__deco"/>
        
        <section class="compte__section">
            <h2>Mon Panier</h2>
            <gridCard :valeurMontres="monPanier"/>
            <p v-if="monPanier.length == 0" class="compte__section--texte">Votre panier est vide.</p>
        </section>

        <hr class="compte__deco"/>

        <myButton class="compte__bouton" @click="deconnexion" color="black">Je me déconnecte</myButton>
    </main>
</template>

<style lang="scss">
.compte{

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
}
</style>
  
<script setup>
import { API } from '@/utils/axios.js'

const router = useRouter()

const mesMontres = ref([])
const monPanier = ref([])

const store = useGlobalStore()

// récupérations des tables pour afficher la montre et tous les paramètres
const getMontres = async () => {
    const response = await API.get(`/user/${store.token}`)
    mesMontres.value = response.data
}

// récupérations des tables pour afficher la montre et tous les paramètres
const getPanier = async () => {
    const response = await API.get(`/user/${store.token}/panier`)
    monPanier.value = response.data
}

// enregistrement de la montre modifiée dans la base de données
const deconnexion = async () => {
    store.clearToken() // Enregistrer le token dans le store Pinia
    router.push('/login')
}

onMounted(async () => {
    await getMontres()
    await getPanier()
})
</script>