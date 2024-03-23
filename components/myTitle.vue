<template>
    <div class="my_title">
        <h1 class="my_title__texte"><slot class="my_title__texte-valeur"/></h1>
    </div>
</template>

<style lang="scss">
.my_title{
    border: 2px solid transparent;
    background: url("/img/montre.jpg");
    margin: -100px;
    margin-bottom: $m-medium;
    background-position: 50% 25%;

    &__texte{
        max-width: 90vw;
        margin-left: auto;
        margin-right: auto;
        color: $color-white;
    }
}
</style>