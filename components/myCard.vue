<template>
    <div class="my_card">
        <ThreeSeen :boitier_texture="boitier_texture" :boitier_forme="boitier_forme" :bracelet_texture="bracelet_texture" :pierre_couleur="pierre_couleur" :main_color="main_color" :fond_nom="fond_nom" />

        <p>nom : {{ nom }}</p>
        <br/>
        <p>dernier_modifieur : {{ dernier_modifieur }}</p>
        <br/>
        <p>boitier_texture : {{ boitier_texture }}</p>
        <br/>
        <p>boitier_forme : {{ boitier_forme }}</p>
        <br/>
        <p>bracelet_texture : {{ bracelet_texture }}</p>
        <br/>
        <p>pierre_nom : {{ pierre_nom }}</p>
        <br/>
        <p>pierre_couleur : {{ pierre_couleur }}</p>
        <br/>
        <p>main_color : {{ main_color }}</p>
        <br/>
        <p>fond_nom : {{ fond_nom }}</p>
        <br/>
        <p>prix_montre : {{ prix_montre }} €</p>

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
  dernier_modifieur: String,
  boitier_texture: String,
  boitier_forme : String,
  bracelet_texture : String,
  pierre_nom : String,
  pierre_couleur : String,
  main_color : String,
  fond_nom : String,
  prix_montre: Number,
})

</script>