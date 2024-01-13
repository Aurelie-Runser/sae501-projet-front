<template>
    <main class="accueil">
        <section class="accueil__section">
            <h1 class="accueil__titre">Créez vos propres montres sur mesure</h1>

            <div class="accueil__boutons">
                <myButton lien="/montre">Voir les Montres</myButton>
                <myButton v-if="!store.token" lien="/login" color="white">Login</myButton>
                <myButton v-if="store.token" lien="/compte" color="white">Mon Compte</myButton>
            </div>
        </section>
    </main>
</template>

<style lang="scss">
.accueil{
    height: 90vh;
    overflow: hidden;
    background-image: url("/img/montre.jpg");    
    background-position: top center;

    &__titre{
        color: $color-white;
    }

    &__boutons{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: $m-litle;
        width: 100%;
        margin-top: 150px;
    }
}
</style>

<script setup>
const store = useGlobalStore()

</script>