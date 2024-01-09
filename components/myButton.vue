<template>
    <div>
        <RouterLink v-if="lien" :to="lien" class="my_button" :class="className">
            <slot/>
        </RouterLink>
        
        <div v-else class="my_button" :class="className">
            <slot/> 
        </div>
    </div>
</template>

<style lang="scss">
.my_button{
    display: block;
    width: fit-content;
    background: $color-main;
    border-radius: 5px;
    padding: $m-small $m-medium;
    font-weight: $font_weight-semibold;
    color: $color-white;
    cursor: pointer;
    
    &:hover{
        background: darken($color-main, 10%);
    }
    
    &.-black{
        background: $color-black;

        &:hover{
            background: lighten($color-black, 25%);
        }
    }
}
</style>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  lien: String,
  color: String
});

const className = computed(() => ({
  " -black": props.color === "black",
}));
</script>