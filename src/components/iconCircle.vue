<template>
    <div :class="['icon-Circle', icon == 1 ? 'icon-Circle-image-1' : 'icon-Circle-image-1']">
    </div>
</template>
<style>
    .icon-Circle{
        width:30px;
        height:30px;
        border-radius: 50%;
        position: absolute;
        right:20px;
        bottom:50px;
        background: red;
    }
    .icon-Circle-image-1{
        background: url("../assets/images/a38bf3dbc4d06f931f0e1d072f5724ac.png");
    }
</style>
<script>
    export default {
        props: {
            icon: {
                type: Number
            }
        }
    }
</script>
