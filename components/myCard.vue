<template>
    <div class="my_card">
        <h3>Ma Montre</h3>

        <p>{{ id_montre }}</p>
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

import { computed } from 'vue'

const props = defineProps({
  id_montre: String,
  nom: String,
  prix_montre: String,
  boitier_texture: String,
})
</script>