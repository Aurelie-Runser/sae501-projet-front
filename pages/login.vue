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

            <div v-if="isCharging">
                <loader/>
            </div>
            <p class="login__error login__error--mobile" v-if="messageInscrit">{{ messageInscrit }}</p>
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

        <div v-if="isCharging">
            <loader/>
        </div>
        <p class="login__error login__error--pc" v-if="messageInscrit">{{ messageInscrit }}</p>
        <p class="login__error" v-if="messageCo">{{ messageCo }}</p>
    </main>
</template>

<style lang="scss">
.login{
    padding-top: 5rem;
    
    &__sections{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
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
        display: block;
        flex: none;
        width: 100%;
        height: 2px;
        border: none;
        border-radius: 100%;
        background: $color-main;
    }

    @include xlarge{
        &__deco{
            width: 2px;
            height: 400px;
        }
    }

    &__error{
        height: fit-content;
        margin: $m-litle auto;
        text-align: center;
        font-size: $font-size-litle;

        &--mobile{
            @include large{
                display: none;
            }
        }

        &--pc{
            display: none;

            @include large{
                display: block;
            }
        }
    }   
}
</style>
  
<script setup>
import {API} from '@/utils/axios'
const store = useGlobalStore()

const router = useRouter()
const userNew = ref({})
const messageInscrit = ref("")
const userCo = ref({})
const messageCo = ref("")
const isCharging = ref(false)

const inscription = async () => {
    messageCo.value = ""
    isCharging.value = true
    try {
        await API.post(`/user/add`, userNew.value);
        isCharging.value = false
        messageInscrit.value = "Votre inscription a réussi. Bienvenue. Connectez-vous pour pouvoir créer vos montres et gérer votre panier."
        connexion
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error.message)
        isCharging.value = false
        messageInscrit.value = "Erreur lors de l'inscription"
    }
}

const connexion = async () => {
    messageInscrit.value = ""
    isCharging.value = true
    try {
        const response = await API.post(`/login`, userCo.value)
        isCharging.value = false
        const { token } = response.data // Récupérer le token depuis la réponse API
        store.setToken(token) // Enregistrer le token dans le store Pinia
        messageCo.value = "Vous êtes bien connecté. Bonjour"
        router.push('/compte')
    } catch (error) {
        console.error("Erreur lors de la connexion :", error.message)
        isCharging.value = false
        messageCo.value = "Erreur lors de la connexion"
    }
}
</script>