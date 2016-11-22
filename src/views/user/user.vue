<template>
    <scroller lock-x style="position: absolute;top:0;bottom: 55px;left: 0;right: 0" height="auto">
        <div>
            <user-avatar v-link="{name:''}"></user-avatar>



            <user-item title="我的收藏" :href="{name:''}" :show="true">
                <span slot="icon-info" class="td-icon-collection td-icon-lt"></span>
            </user-item>

        </div>
    </scroller>

</template>

<style>
    .td-icon-lt{
        font-family: Taidii;
    }
    .td-icon-upload:before{
        content: "\e900"
    }
    .td-icon-collection:before{
        content: "\e906"
    }
    .td-icon-mission:before{
        content: "\e902"
    }
    .td-icon-setup:before{
        content: "\e904"
    }
</style>

<script>
import userAvatar from './userAvatar.vue'
import userItem from '../../components/userItem.vue'
import scroller from '../../../node_modules/vux/dist/components/scroller/index'

export default{
  components: {
    userAvatar,
    userItem,
    scroller
  }
}
</script>