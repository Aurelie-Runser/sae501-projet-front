<template>
    <div class="header">
        <div class="header__menu">
            <menuIcon v-if="!menuIsOpen" @click="menuIsOpen = true"/>
            <croixIcon v-else @click="menuIsOpen = false"/>
        </div>
        <nav class="header__nav" v-if="menuIsOpen">
            <ul class="header__liste">
                <li class="header__item">
                    <RouterLink to="/" @click="openMenu">Accueil</RouterLink>
                </li>
                <li class="header__item">
                    <RouterLink to="/montre" @click="openMenu">Les Montres</RouterLink>
                </li>
                <li class="header__item" v-if="!store.token">
                    <RouterLink to="/login" @click="openMenu">Login</RouterLink>
                </li>
                <li class="header__item" v-if="store.token">
                    <RouterLink to="/compte" @click="openMenu">Mon Compte</RouterLink>
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
    height: fit-content;
    min-height: 5rem;
    width: 100vw;
    padding: $m-litle;
    background: $color-white;

    &__menu{
        position: fixed;
        top: 1rem;
        right: 1rem;
        width: 3rem;
        color: $color-main;
        cursor: pointer;
    }

    &__liste{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-end;
        gap: $m-litle;
        max-width: $xl;
        margin: 5rem auto 1rem auto;
        text-transform: capitalize;
    }

    &__item{
        width: fit-content;
        font-size: $font_size-small+0.25rem;
        font-weight: $font_weight-semibold;
        text-align: center;
        transition: all .2s ease-in-out;
        
        &:hover{
            color: darken($color-main, 10%);
            background: rgba($color-main, 5%);
            box-shadow: 0 0 20px 10px rgba($color-main, 8%);
        }
    }

    @include small{
        min-height: fit-content;
        
        &__menu{
            display: none;
        }

        &__liste{
            position: relative;
            margin: auto;
            flex-direction: row;
            justify-content: center;
            gap: 20%;
        }
    }
}   
</style>

<script setup>
const store = useGlobalStore()

const menuIsOpen = ref(false)

const openMenu = () => {
    if (window.innerWidth < 640) {
        menuIsOpen.value = false;
    } else {
        menuIsOpen.value = true;
    };
}

onMounted(() => {
    openMenu()
    window.addEventListener('resize', openMenu);
});

</script>