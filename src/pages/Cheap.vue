<template>
  <div>
    <top-search :hotWords='hotWords' :behaviorFun='getBehaviorAdd' :pathOn='"九块九"'></top-search>
    <div id="main" class="clearfix">
      <div id="content" style="margin-right:0px;">
        <div id="navigation" class="brand-filter">
          <dl>
            <dt>类别：</dt>
            <dd>
              <a @click="changeCategorys('')" :class="[categoryState==undefined?'on':'']" href="javascript:;">全部</a>
              <a v-for="c in categorys" :class="[categoryState==c?'on':'']" @click="changeCategorys(c)" href="javascript:;">{{c}} </a>
            </dd>
          </dl>
        </div>
      </div>

      <div class="cheap-item" v-for="item in cheaps">
        <a :href="item.url" target="_blank">
          <div class="pic"><img :src="item.listImage"></div>
          <p class="time">{{changeTime(item.syncTime)}}</p>
          <p>{{item.title}}</p>
          <span class="price"><span class="pre-p">{{item.coupon?"券后":""}}￥</span>{{item.price}}</span>
          <span class="btn">去购买</span>
          <span class="btn" v-if="item.coupon">{{item.coupon}}</span>
        </a>
      </div>
      <div style="clear:both;"></div>
      <div class="pageBar clearfix" style="clear:both;width:100%;">
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
    <gt-footer></gt-footer>
  </div>
</template>
<script>
  import TopSearch from '../components/TopSearch.vue'
  import Navigation from '../components/Navigation.vue'
  import gtFooter from '../components/Footer.vue'
  import Paginate from 'vuejs-paginate'
  import qs from 'qs';
  import { mapActions, mapState,mapGetters } from 'vuex'
  import { baseTitle } from '../utils/Global'
  import {changeTime,getOff,createUrl} from '../utils/utils';

  export default{
    name:'index',
    components:{
      TopSearch,
      Navigation,
      gtFooter,
      Paginate
    },
    data () {
      return {
        categorys:["零食茶酒","数码家电","居家生活","服装内衣","鞋包配饰","母婴儿童","彩妆护肤","图书文体"]
      }
    },
    methods: {    //绑定事件的关键代码
      changeTime: function(time) {
        return changeTime(time);
      },
      changePage: function(i){
        var obj =Object.assign({}, this.$route.query, {page:i})
        var d = qs.stringify(obj);
        this.$router.push({path:this.$route.path+'?'+d})
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      changeCategorys: function(category){
        var obj =Object.assign({}, this.$route.query, {category:category,page:1})
        var d = createUrl(obj);
        console.log(this.$route)
        this.$router.push({path:this.$route.path+'?'+d})
      },
      ...mapActions([
        'getBehaviorAdd',
        'getHotWords',
        'getCheaps'
        ])
    },
    computed: {
      ...mapGetters(['getPageCount']),
      ...mapState(['hotWords','cheaps','goodsPageIndex']),
      categoryState(){
          return this.$route.query.category;
      },
    },
    created () {
      this.getHotWords();
      this.getCheaps(this.$route.query);
    },
    watch:{
      '$route' (to,from) {
        this.getCheaps(to.query);
      }
    }
  }
</script>
