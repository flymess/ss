<template>
    <tabbar>
        <tabbar-item   :selected="$route.name == 'home'">
            <span slot="icon" class="td-icon-index td-icon"></span>
            <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item  :selected="$route.name == 'message'">
            <span slot="icon" class="td-icon-message td-icon"></span>
            <span slot="label">消息</span>
        </tabbar-item>
        <tabbar-item  :selected="$route.name == 'user'">
            <span slot="icon" class="td-icon-mine td-icon"></span>
            <span slot="label">我的</span>
        </tabbar-item>
    </tabbar>
</template>

<style>
    @font-face {
        font-family: 'Taidii';
        src: url('/font/icomoon.eot');
        src: url('/font/icomoon.eot?#iefix') format('embedded-opentype'),
        url('/font/icomoon.woff') format('woff'),
        url('/font/icomoon.ttf') format('truetype'),
        url('/font/icomoon.svg#Taidii') format('svg');
        font-weight: normal;
        font-style: normal;
    }
    .td-icon-mine:before{
        font-family: 'Taidii';
        content: "\e901"
    }
    .td-icon-message:before{
        font-family: 'Taidii';
        content: "\e903"
    }
    .td-icon-index:before{
        font-family: 'Taidii';
        content: "\e905"
    }
    .td-icon{
        width:100%;
        text-align: center;
        display: block;
        font-size: 20px;
        color:#333
    }
</style>

<script>
    import Tabbar from '../../node_modules/vux/dist/components/tabbar/index'
    import TabbarItem from '../../node_modules/vux/dist/components/tabbar-item/index'

    export default{
        components: {
            Tabbar,
            TabbarItem
        }
    }
</script>