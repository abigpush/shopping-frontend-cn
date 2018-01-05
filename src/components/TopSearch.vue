<template>
  <div>
    <div class="headBar clearfix">
      <div class="headBar-inner">
        <div class="inner">
          <a href="javascript:;" class="logo" @click="gotoIndex"><img src="../assets/logo-cn.png"></a>
          <div class="search">
            <div class="search-box">
              <input type="text" class="search-txt" v-model="search" @keyup.enter="doSearch">
              <span class="search-btn" @click="doSearch"></span>
            </div>
            <div class="hotword clearfix">
              <a v-for="(h,index) in hotWords" v-bind:class="{on:index%2 != 0}" @click="changePage(h.hotword)">{{h.hotword}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="navBar" :class="searchBarFixed == true ? 'isFixedNav navBar clearfix' :'navBar clearfix'">
      <div class="nav-inner">
        <ul>
          <template v-for="item in linkList">
            <router-link  v-if="!item.blank" :to="item.link"><li :class="pathOn == item.name?'on':''">{{item.name}}</li></router-link>
            <a v-if="item.blank" :href="item.link" target="_blank"><li>{{item.name}}</li></a>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {createUrl} from '../utils/utils';
    export default {
      name:'topSearch',
      data(){
        return {
          search:'',
          linkList:[{link:"/",name:'国内折扣'}
                    ,{link:"/Abroad",name:'海淘折扣'}
                    ,{link:"/cheap",name:'九块九'}
                    // ,{link:"https://uland.taobao.com/coupon/list?pid=mm_30116902_4564351_14864882",blank:true,name:'优惠券'}
                    ,{link:"http://re.taobao.com/?pid=mm_30116902_2665623_9725169",name:"女装频道",blank:true}],
          cur:'国内折扣',
          searchBarFixed:false,
          offsetTop:0,//初始位置
          flag:false// 延后获取初始位置的flag
        }
      },
      props:{
        hotWords:{
          default:[]
        },
        behaviorFun: {
          type: Function,
        },
        pathOn:{
          default:'国内折扣'
        }
      },
      methods: {    //绑定事件的关键代码
        changePage: function(key){
          var d = createUrl({page:1,key:key});
          this.behaviorFun({type:3,url:this.$route.fullPath,key:key});
          this.$router.push({path:'/?'+d})
        },
        doSearch:function(){
          var text = this.search.trim();
          if(text){
            this.changePage(text)
//            this.search = '';
          }
        },
        gotoIndex: function(){
          var obj =Object.assign({}, this.$route.query, {page:1,key:''})
          var d = createUrl(obj);
          this.$router.push({path:'/?'+d})
        },
        handleScroll () {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          if(!this.flag){
            this.flag=true
            this.offsetTop = document.querySelector('#navBar').offsetTop
          }
          if (scrollTop > this.offsetTop+10) {
            this.searchBarFixed = true
          } else {
            this.searchBarFixed = false
          }
        }
      },
      watch:{
        '$route' (to, from) {
          this.search=to.query.key;
        }
      },
      created () {
        this.search=this.$route.query.key;
      },
      mounted () {
        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll)
        this.offsetTop = document.querySelector('#navBar').offsetTop
      }

    }
</script>
<style>
  .search{cursor: pointer}
  .isFixedNav{
    position:fixed;
    top:0px;
    z-index:9999;
    width: 100%;
  }
</style>
