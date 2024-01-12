<template>
    <main class="login">
        <myTitle class="login__title">Login</myTitle>

        <div class="login__sections">
            <section class="login__inscription">
                <h2>Inscription</h2>
    
                <form class="login__form" @submit.prevent="inscription" method="post">
                    <input type="text" name="pesudo" id="pesudo" required placeholder="Pseudo" v-model="userNew.pseudo">
                    <input type="text" name="mdp" id="mdp" required placeholder="Mot de Passe" v-model="userNew.mdp">
                    <input class="login__form--bouton" type="submit" value="Je m'inscris">
                </form>
    
            </section>

            <div class="login__deco"></div>
    
            <section class="login__connexion">
                <h2>Connexion</h2>
    
                <form class="login__form" @submit.prevent="connexion" method="post">
                    <input type="text" name="pesudo" id="pesudo" required placeholder="Pseudo" v-model="userCo.pseudo">
                    <input type="text" name="mdp" id="mdp" required placeholder="Mot de Passe" v-model="userCo.mdp">
                    <input class="login__form--bouton" type="submit" value="Je me connecte">
                </form>
    
            </section>
        </div>

        <p class="login__error">{{ message }}</p>
    </main>
</template>

<style lang="scss">
.login{

    &__sections{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: $m-small;
        
        > * {
            flex: 0 1 500px;
        }
    }
    
    &__form{
        display: flex;
        flex-direction: column;
        gap: $m-litle;
        max-width: 80%;
        margin: auto;
        padding-bottom: $m-medium;
        
        &--bouton{
            margin: auto;
        }
    }

    &__deco{
        display: none;
    }

    @include xlarge{
        &__deco{
            display: block;
            flex: none;
            width: 2px;
            border: none;
            border-radius: 100%;
            background: $color-main;
        }
    }

    &__error{
        height: fit-content;
        margin-top: $m-litle;
        text-align: center;
        font-size: $font-size-regular;
    }   
}
</style>
  
<script setup>
import {API} from '@/utils/axios'
import { useGlobalStore } from '@/stores/global'
const store = useGlobalStore()

const router = useRouter()
const userNew = ref({})
const userCo = ref({})
const message = ref("")

const inscription = async () => {
    try {
        await API.post(`/user/add`, userNew.value);
        message.value = "Votre inscription a réussi. Bienvenue. Connectez-vous pour pouvoir créer vos montres et gérer votre panier."
        connexion
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error.message)
        message.value = "Erreur lors de l'inscription"
    }
}

const connexion = async () => {
    try {
        const response = await API.post(`/login`, userCo.value)
        const { token } = response.data // Récupérer le token depuis la réponse API
        store.setToken(token) // Enregistrer le token dans le store Pinia
        message.value = "Vous êtes bien connecté. Bonjour"
        router.push('/compte')
    } catch (error) {
        console.error("Erreur lors de la connexion :", error.message)
        message.value = "Erreur lors de la connexion"
    }
}
</script>