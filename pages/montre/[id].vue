<template>
    <main>
        <h1>La Montre</h1>

        <ul>
            <li v-for="(m, index) in montre[0]" :key="index">{{ m }}</li>
        </ul>

        <hr/>

        <form action="getMontreModif">
          
            <select name="montre" id="montre">
                <option v-for="(m, index) in montre[0]" :key="index" :value="index">{{ m }}</option>
            </select>
        
        </form>

        <myButton>Modifier</myButton>

        
    </main>
</template>

<script setup>
import myButton from "@/components/myButton.vue"

import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { API } from '@/utils/axios.js'

const route = useRoute()
const montre = ref([])

const getMontre = async () => {
    const response = await API.get(`/montre/${route.params.id}`)
    return response.data
}

const getMontreModif = async () => {
    const response = await API.get(`/montre/${route.params.id}/modif`)
    return response.data
}

const getMontreSupp = async () => {
    const response = await API.get(`/montre/${route.params.id}/supp`)
    return response.data
}

onMounted(async () => {
    montre.value = await getMontre()
})

</script>