<template>
    <div>hello World</div>
    <footer-line></footer-line>
    <icon-button v-link="{name: 'user'}" :icon="1"></icon-button>
</template>
<style>

</style>
<script>
    import footerLine from '../../components/footerLine.vue'
    import iconButton from '../../components/iconCircle.vue'

    export default{
        components: {
            iconButton,
            footerLine
        }
    }
</script>
