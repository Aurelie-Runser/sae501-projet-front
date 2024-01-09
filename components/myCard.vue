<template>
    <div class="my_card">
        <p>{{ nom }}</p>
        <p>{{ prix_montre }} €</p>

        <myButton :lien="`/montre/${id_montre}`">Voir</myButton>

    </div>

</template>

<style lang="scss">
.my_card{
    border: 2px solid red;
    width: 500px;
    padding: $m-small;

    p{
        width: fit-content;
        height: fit-content;
    }
}
</style>

<script setup>
import myButton from "@/components/myButton.vue"

defineProps({
  id_montre: Number,
  nom: String,
  prix_montre: Number,
  boitier_texture: String,
})
</script>