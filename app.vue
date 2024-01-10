<template>
  <div>
    <NuxtLayout/>
  </div>
</template>

<script setup>
const store = useGlobalStore()

onMounted(() => {
  // fonction pour vérifié si l'utilisateur était connecté à sa dernière visite
  const token = localStorage.getItem("Token de Connection")
  store.setToken(JSON.parse(token))
  
  // // fonction pour inialiser le panier en fonction des données enregistrées en local par rapport à la dernière visite
  // const token = localStorage.getItem("Token de Connection")
  // store.setToken(JSON.parse(token))
})
</script>