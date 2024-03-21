<template>
    <main class="accueil">
        <section class="accueil__section">
            <h1 class="accueil__section--titre">Créez vos propres montres sur mesure</h1>

            <div class="accueil__section--boutons">
                <myButton lien="/montre">Voir les Montres</myButton>
                <myButton v-if="!store.token" lien="/login" color="white">Login</myButton>
                <myButton v-if="store.token" lien="/compte" color="white">Mon Compte</myButton>
            </div>
        </section>
    </main>
</template>

<style lang="scss">
.accueil{
    position: fixed;
    width: 100vw;
    height: 100vh;

    &::before{
        content: "";
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-image: url("@/img/montre.jpg");  
        background-position: top center;
        filter: brightness(80%);
    }

    &__section{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: $m-big;
    
        &--titre{
            color: $color-white;
            margin: 0;
        }
    
        &--boutons{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: $m-litle;
        }
    }

    @include medium{
        &__section{

            &--boutons{
                gap: $m-big;
            }
        }
    }
}
</style>

<script setup>
const store = useGlobalStore()

</script>