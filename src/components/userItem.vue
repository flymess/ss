<template>
    <div class="weui_panel weui_panel_access">
        <div class="td_panel_hd " v-if="title">
            <slot name="icon-info"></slot>
            <span>{{title}}</span>
            <span class="td-pull-right with-arrow" v-link="href">更多</span>
        </div>
        <div class="td-xs-wrap" v-if="show">
            <div class="td-xs-50">

            </div>
            <div class="td-xs-50">

            </div>
        </div>

    </div>
</template>

<style>
 .td-icon-lt{
     float: left;
     margin-left: -25px;
 }
 .td-xs-wrap{
     padding:8px 0 8px 8px;
     display: flex;
 }
 .td-xs-50{
     flex: 1;
     padding-right: 8px;
     height: 100px;
 }
</style>

<script>
export default{
  props: {
    title: {
      type: String,
      default: ''
    },
    href: {
      type: Object
    },
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>