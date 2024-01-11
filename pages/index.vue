<template>
    <main class="accueil">
        <section class="accueil__section">
            <h1 class="accueil__titre">Créez vos propres montres sur mesure</h1>

            <div class="accueil__boutons">
                <myButton lien="/montre">Voir les Montres</myButton>
                <myButton lien="/login" color="black">Se Connecter</myButton>
            </div>
        </section>
    </main>
</template>

<style lang="scss">
.accueil{
    min-height: 100vh;
    background-image: linear-gradient(rgba($color-white, 0.1), rgba($color-white, 0.1)),
                    url("@/img/montre.jpg");    

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
</script>