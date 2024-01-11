<template>
    <main>
        <h1>Mon Compte</h1>

        <h2>Mes Montres</h2>
        <ul>
            <li v-for="m in mesMontres">
                <myCard v-bind="m"/>
            </li>
        </ul>

        <h2>Mon Panier</h2>
        <ul>
            <li v-for="p in panier">
                <myCard v-bind="p"/>
            </li>
        </ul>

        <myButton @click="deconnexion" color="black">Je me déconnecte</myButton>
    </main>
</template>
  
<script setup>
import { API } from '@/utils/axios.js'

const router = useRouter()

const mesMontres = ref([])
const panier = ref([])

const store = useGlobalStore()

// récupérations des tables pour afficher la montre et tous les paramètres
const getMontres = async () => {
    const response = await API.get(`/user/${store.token}`)
    mesMontres.value = response.data
}

// récupérations des tables pour afficher la montre et tous les paramètres
const getPanier = async () => {
    const response = await API.get(`/user/${store.token}/panier`)
    panier.value = response.data
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