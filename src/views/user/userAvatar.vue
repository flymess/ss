<template>
    <div class="td-user-avatar-item td-red">
        <img :src="headImgUrl" v-if="headImgUrl">
        <div class="td-user-avatar" v-link="href">
            <h3>{{name}}</h3>
            <p>点击查看个人资料</p>
        </div>
    </div>


</template>

<style>
    .td-red{
        background: #e96153;
    }
    .td-user-avatar-item{
        display: flex;
        align-items:center;
        padding: 10px;
    }
    .td-user-avatar{
        color: #fff;
        flex: 1;
    }
    .td-user-avatar-item img{
        height: 60px;
        width: 60px;
        border-radius: 50%;
        margin-right: 15px;
    }
    .td-user-avatar h3{
        color:#fff;
        font-size: 16px;
    }
    .td-user-avatar p{
        padding-top: 10px;
        font-size: 12px;
    }
</style>

<script>
export default{
  props: {
    href: {
      type: Object
    },
    name: {
      type: String
    },
    headImgUrl: {
      type: String
    }
  }
}
</script>