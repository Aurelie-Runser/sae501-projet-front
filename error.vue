<template>
    <main class="error">
        <h1>Erreur {{ error.statusCode }}</h1>
        <p>{{ error.statusMessage }}</p>
    
        <myButton class="error__bouton" lien="/">Retourner à l'accueil</myButton>
    </main>
</template>

<style lang="scss">
.error {
    text-align: center;
  
    > * {
        margin: 40px auto;
    }

    &__bouton{
        width: fit-content;
    }
}
</style>

<script setup>
const props = defineProps({
  error: Object,
});
</script>
  