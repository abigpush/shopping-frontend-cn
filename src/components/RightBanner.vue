<template>
	<div class="right-banner">

		<!-- <swiper :options="swiperOption" ref="mySwiper" class="right-swiper" v-if="hotGoods.length!=0">
			<swiper-slide v-for="good in hotGoods" :key='good.id'><img :src="good.smallImageUrl" ></swiper-slide>
			<div class="swiper-pagination"  slot="pagination"></div>
	  </swiper> -->
    <!-- <swiper :options="swiperOption" ref="mySwiper" class="right-swiper">
      <swiper-slide><img src="../assets/images/coupons.jpg" ></swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper> -->
    <a href="https://uland.taobao.com/coupon/list?pid=mm_30116902_4564351_14864882" target="_blank"><img src="../assets/images/coupons.jpg" ></a>
	</div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  props:{
    // hotGoods:{
    //   default:[]
    // }
  },
  name: 'carrousel',
    data() {
      return {
         swiperOption: {
		  autoplay: true,// 自动播放
          spaceBetween: 30,//滚动切换时的 两分页间隔
          loop: true,//循环
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    }

}
</script>
<style>
	.right-banner{ width: 300px; height: 250px;margin-bottom: 15px}
	.right-banner img{ width: 100%; vertical-align: top}
	.right-swiper{width: 100%;height: 100%}
	.swiper-pagination-bullet {border:1px solid #fff;}
</style>
