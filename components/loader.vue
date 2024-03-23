<template>
    <div class="loader">
        <div class="loader__anim"></div>
        <p class="loader__text">Chargement</p>
    </div>
</template>

<style lang="scss">
.loader{
    width: fit-content;
    margin: auto;
    text-align: center;

    &__anim{
        margin: auto;
        width: 75px;
        height: 75px;
        border: $color-main 7px solid;
        border-bottom-color: transparent;
        border-bottom-style: dashed;
        border-radius: 100%;
        animation: loading 2s infinite linear;
    }

    &__text{
        margin: $m-small auto;
        font-size: $font_size-regular;
    }
}

@keyframes loading {
    0%{transform: rotate(0deg)};
    25%{transform: rotate(90deg)};
    50%{transform: rotate(180deg)};
    75%{transform: rotate(270deg)};
    100%{transform: rotate(360deg)};
}
</style>