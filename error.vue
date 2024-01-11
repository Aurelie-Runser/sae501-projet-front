<template>
    <main class="error">
        <myTitle>Erreur {{ error.statusCode }}</myTitle>
        <p>{{ error.statusMessage }}</p>
    
        <myButton class="error__bouton" lien="/">Retourner à l'accueil</myButton>
    </main>
</template>

<style lang="scss">
.error {
    text-align: center;
    
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
  