<template>
  <div>
    <top-search :hotWords='hotWords' :behaviorFun='getBehaviorAdd'></top-search>
    <banner :banners='banners'></banner>
    <div id="main" class="clearfix">
      <div id="sidebar">
        <right-banner :hotGoods='hotGoods'></right-banner>
        <hot-goods :hotGoods='hotGoods' :behaviorFun='getBehaviorAdd'></hot-goods>
      </div>
      <div id="content">
        <navigation :malls="malls" :categorys='categorys' v-if="flag"></navigation>
        <a class="feednotify" v-if="goodsNotify>criticalNotifyNum"  @click="getGoodsList($route.query)">
          <span>●</span>
          <span>有{{goodsNotify}}条新条目发布 点击查看 >></span>
        </a>
        <div v-if="goodsList">
          <goods-items :goodsList='goodsList' :behaviorFun='getBehaviorAdd' :getThumbsAdd="getThumbsAdd"></goods-items>
          <div class="pageBar clearfix">
            <paginate
              :page-range="5"
              :page-count="getPageCount"
              :click-handler="changePage"
              :force-page="goodsPageIndex-1"
              :prev-text="'&lt;&lt;'"
              :next-text="'&gt;&gt;'">
            </paginate>
          </div>
        </div>
        <div v-if="!goodsList" class="search_no">
          <div class="search_no_box">No corresponding discount information was found </div>
        </div>
      </div>
    </div>
    <gt-footer></gt-footer>
  </div>
</template>
<script>
  import TopSearch from '../components/TopSearch.vue'
  import Banner from '../components/Banner.vue'
  import Navigation from '../components/Navigation.vue'
  import GoodsItems from '../components/GoodsItems.vue'
  import HotGoods from '../components/HotGoods.vue'
  import RightBanner from '../components/RightBanner.vue'
  import gtFooter from '../components/Footer.vue'
  import Paginate from 'vuejs-paginate'
  import qs from 'qs';
  import { mapActions, mapState,mapGetters } from 'vuex'
  import { autoFetchTime, criticalNotifyNum,baseTitle } from '../utils/Global'

  export default{
  name:'index',
  components:{
    TopSearch,
    Banner,
    Navigation,
    GoodsItems,
    HotGoods,
    RightBanner,
    gtFooter,
    Paginate
  },
    data () {
      return {
        criticalNotifyNum: criticalNotifyNum
      }
    },
    methods: {    //绑定事件的关键代码
      changePage: function(i){
        var obj =Object.assign({}, this.$route.query, {page:i})
        var d = qs.stringify(obj);
        this.$router.push({path:'/?'+d})
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      ...mapActions([
        'getHotGoods',
        'getMalls',
        'getCategorys',
        'getHotWords',
        'getGoodsList',
        'getGoodsNotify',
        'getSearchList',
        'getBehaviorAdd',
        'getThumbsAdd',
        'getBanners'
        ])
    },
  computed: {
    ...mapGetters(['getPageCount']),
    ...mapState(['hotWords','goodsList','hotGoods','malls','categorys','goodsPageIndex','goodsNotify','maxId','maxSyncTime','banners']),
    flag(){
      if(this.$route.query.key){return false}
      else return true;
    }
  },
  created () {
    this.getBanners();
    this.getHotGoods();
    this.getMalls();
    this.getCategorys();
    this.getHotWords();
    if(this.$route.query.key){
      this.getSearchList(this.$route.query);
    }
    else {
      this.getGoodsList(this.$route.query);
    };

    //定时请求任务  获取新增条目数;
    this.intervalid = setInterval(() => {
        //原数据中没有 goodsList 或者 this.$route.query.key存在时 不求数据
        if(this.goodsList&&!this.$route.query.key){
          this.getGoodsNotify(Object.assign({},this.$route.query,{id:this.maxId,sync:this.maxSyncTime}));
       }
     },autoFetchTime);

  },
  watch:{
    '$route' (to, from) {
      if(to.query.key){
        this.getSearchList(to.query);
      }
      else{
        this.getGoodsList(to.query);
      }
    },
    'goodsNotify' (to,from){
      if(to&&to>criticalNotifyNum){
        document.title = '(' + to + '条更新) '+baseTitle;
      }else{
        document.title = baseTitle;
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalid)
    },
  }
</script>
