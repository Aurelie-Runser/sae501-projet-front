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
    @include my_button;
    
    &.-black{
        background: $color-black;

        &:hover{
            background: lighten($color-black, 25%);
        }
    }
    
    &.-white{
        color: $color-black;
        background: $color-white;

        &:hover{
            background: darken($color-white, 25%);
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
  " -white": props.color === "white",
}));
</script>