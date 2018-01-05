<template>
  <div id="navigation" class="brand-filter">
    <dl>
      <dt>类别：</dt>
      <dd>
        <a @click="changeCategorys('')" :class="[categoryState==undefined?'on':'']" href="javascript:;">全部</a>
        <a v-for="c in categorys" :class="[categoryState==c.name?'on':'']" @click="changeCategorys(c.name)" href="javascript:;">{{c.name}} </a>
      </dd>
    </dl>
    <dl>
      <dt>商城：</dt>
      <dd>
        <a @click="changeMalls('')" :class="[mallState==undefined?'on':'']" href="javascript:;">全部</a>
        <a v-for="m in malls" :class="[mallState==m.name?'on':'']"  @click="changeMalls(m.name)" href="javascript:;">{{m.name}} </a>
      </dd>
    </dl>
  </div>
</template>
<script>
  import {createUrl} from '../utils/utils';
  export default {
    name:'navigation',
    props:{
      malls:{
        default:[]
      },
      categorys:{
        default:[]
      },
      nation:{
        default:''
      }
    },
    computed: {
      categoryState(){
          return this.$route.query.category;
      },
      mallState(){
        return this.$route.query.mall;
      }
    },
    methods: {    //绑定事件的关键代码
      changeCategorys: function(category){
        var obj =Object.assign({}, this.$route.query, {nation:this.nation,category:category,page:1,key:''})
        var d = createUrl(obj);
        //console.log(this.$route)
        this.$router.push({path:this.$route.path+'?'+d})
      },
      changeMalls: function(mall){
        var obj =Object.assign({}, this.$route.query, {nation:this.nation,mall:mall,page:1,key:''})
        var d = createUrl(obj);
        this.$router.push({path:this.$route.path+'?'+d})
      },

    }

  }
</script>
<style>

</style>
