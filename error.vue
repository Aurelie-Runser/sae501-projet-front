<template>
    <main class="error">
        <myTitle class="error__title">Erreur {{ error.statusCode }}</myTitle>
        <p>{{ error.statusMessage }}</p>
    
        <myButton class="error__bouton" lien="/">Retourner à l'accueil</myButton>
    </main>
</template>

<style lang="scss">
.error {
    padding: 0;
    text-align: center;

    &__title{
        margin: 0;
        margin-bottom: $m-big;
    }
    
    &__bouton{
        margin: 40px auto;
        width: fit-content;
    }
}
</style>

<script setup>
const props = defineProps({
  error: Object,
});
</script>
  