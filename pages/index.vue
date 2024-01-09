<template>
    <main class="accueil">
        <section class="accueil__section">
            <h1 class="accueil__titre">Accueil</h1>

            <div class="accueil__boutons">
                <myButton lien="/montre">Voir les Montres</myButton>
                <myButton lien="/login" color="black">Se Connecter</myButton>
            </div>
        </section>
    </main>
</template>

<style lang="scss">
.accueil{

    &__boutons{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: $m-litle;
        width: 100%;
    }
}
</style>

<script setup>
</script>