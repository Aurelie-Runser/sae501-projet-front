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
    // border: red solid 2px;
    min-height: 100vh;
    background-image: linear-gradient(rgba($color-black, 0.2), rgba($color-black, 0.2)),
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