<template>
    <div class="header">
        <nav class="header__nav">
            <ul class="header__liste">
                <li class="header__item" v-for="lien in liens" :key="lien">
                    <RouterLink :to="lien[1]">{{ lien[0] }}</RouterLink>
                </li>
                <li class="header__item" v-if="store.token">
                    <RouterLink to="/panier">Panier</RouterLink>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style lang="scss" scoped>

.header {
    z-index: 50;
    position: sticky;
    top: 0;
    display: block;
    width: 100vw;
    padding: $m-small;
    background: $color-white;

    &__liste{
        display: flex;
        align-self: center;
        justify-content: center;
        gap: 20%;
        text-transform: capitalize;
    }

    &__item{
        font-weight: $font_weight-semibold;

        &:hover{
            color: $color-main;
        }
    }
}   
</style>

<script setup>
const store = useGlobalStore()

const liens = [["Accueil", "/"],
  ["Montres", "/montre"],
  ["Login", "/login"],
]
</script>