<template>
    <main>
        <myTitle>Login</myTitle>

        <div>
            <h2>Inscription</h2>

            <form @submit.prevent="inscription" method="post">
                <input type="text" name="pesudo" id="pesudo" required placeholder="Pseudo" v-model="userNew.pseudo">
                <input type="text" name="mdp" id="mdp" required placeholder="Mot de Passe" v-model="userNew.mdp">

                <input type="submit" value="Je m'inscris">
            </form>

            {{ userNew }}
        </div>

        <div>
            <h2>Connexion</h2>

            <form @submit.prevent="connexion" method="post">
                <input type="text" name="pesudo" id="pesudo" required placeholder="Pseudo" v-model="userCo.pseudo">
                <input type="text" name="mdp" id="mdp" required placeholder="Mot de Passe" v-model="userCo.mdp">

                <input type="submit" value="Je me connect">
            </form>

            {{ userCo }}
        </div>

        <p>{{ message }}</p>
    </main>
</template>
  
<script setup>
import {API} from '@/utils/axios'
import { useGlobalStore } from '@/stores/global'
const store = useGlobalStore()

const router = useRouter()
const userNew = ref({})
const userCo = ref({})
const message = ref("")

// enregistrement de la montre modifiée dans la base de données
const inscription = async () => {
    try {
        await API.post(`/user/add`, userNew.value);
        message.value = "Vous êtes bien inscrit"
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error.message)
        message.value = "Erreur lors de l'inscription"
    }
}

// enregistrement de la montre modifiée dans la base de données
const connexion = async () => {
    try {
        const response = await API.post(`/login`, userCo.value)
        const { token } = response.data // Récupérer le token depuis la réponse API
        store.setToken(token) // Enregistrer le token dans le store Pinia
        message.value = "Vous êtes bien connecté"
        router.push('/compte')
    } catch (error) {
        console.error("Erreur lors de la connexion :", error.message)
        message.value = "Erreur lors de la connexion"
    }
}
</script>