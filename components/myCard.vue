<template>
    <div class="my_card">
        <ThreeSeen v-bind="valeur" />

        <div class="my_card__content">
            <p class="my_card__content--nom">{{ valeur.nom }}</p>
            <div class="my_card__content--infos">
                <p class="user">{{ valeur.dernier_modifieur }}</p>
                <p class="prix">{{ valeur.prix_montre }} €</p>
            </div>
    
            <myButton class="my_card__content--bouton" :lien="`/montre/${valeur.id_montre}`">Voir</myButton>
        </div>
    </div>
</template>

<style lang="scss">
.my_card{
    width: 400px;
    border-radius: 20px;
    box-shadow: 0 5px 10px rgba($color-black, 10%);
    overflow: hidden;

    &__content{
        margin: $m-litle;

        &--nom{
            font-size: $font-size-litle;
            font-weight: $font-weight-bold;   
        }

        &--infos{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: $m-small;
            margin: $m-litle 0;

            p{
                padding: 10px;
                border-radius: 10px;
                background: rgba($color-main, 10%);
            }
 
            .user{
                color: $color-main;
            }
 
            .prix{
                font-weight: $font_weight-medium;
            }
        }

        &--bouton{
            width: fit-content;
            margin: auto;
        }
    }
}
</style>

<script setup>
import myButton from "@/components/myButton.vue"

defineProps({
  valeur: Object,
})

</script>