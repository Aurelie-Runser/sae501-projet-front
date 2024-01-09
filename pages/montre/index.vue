<template>
    <main class="les_montres">
        <h1>Liste des Montres</h1>

        <ul class="les_montres__liste">
            <li v-for="m in montres" class="les_montres__liste--item">
                <myCard v-bind="m"/>
            </li>
        </ul>
        <!-- {{ montres }} -->
    </main>
</template>

<style lang="scss">
.les_montres{
    
    &__liste{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
}
</style>
  
<script setup>
import {API} from '@/utils/axios'

const montres = ref([])

const getMontres = async () => {
  const response = await API.get('/montre')
  return response.data
}

onMounted(async () => {
  montres.value = await getMontres()
})

console.log(montres)
</script>