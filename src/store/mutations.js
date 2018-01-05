import Vue from 'vue'
import * as types from './mutation-types'

export default {
  [types.GET_HOT_WORDS] (state,  data ) {
        state.hotWords=data
  },
  [types.GET_GOODS_LIST] (state,  data ) {
    state.goodsList=data.list;
    state.goodsTotalCount=data.totalCount;
    state.goodsPageSize=data.pageSize;
    state.goodsNotify=0;
    state.goodsPageIndex=parseInt(data.pageIndex);
  },
  [types.GET_MAX_ID_SYNC] (state,  data ) {
    state.maxId=data.maxId;
    state.maxSyncTime=data.maxSyncTime;
  },
  [types.GET_GOODS_DETAIL] (state,  data ) {
    state.goodsDetail=data
  },
  [types.GET_HOT_GOODS] (state,  data ) {
    data.length=6;
    state.hotGoods=data
  },
  [types.GET_MALLS] (state,  data ) {
    state.malls=data
  },
  [types.GET_CATEGORYS] (state,  data ) {
    state.categorys=data
  },
  [types.GET_GOODS_NOTIFY] (state,  data ) {
    state.goodsNotify=data
  },
  [types.GET_THUMBS_ADD] (state,  data ) {
    //返回的 data.data 不用..但是传过来了.
    let  id  = data.payload.id;
    let   d = data.data;
    state.goodsList.forEach(function(val,index){
      if(id==val.id){
        state.goodsList[index].thumbs=d.thumbs;
      }
    })
  },
  [types.GET_THUMBS_ADD_DETAIL] (state,  data ) {
    console.log(data.result.thumbs);
    console.log(state.goodsDetail.thumbs);
    state.goodsDetail.thumbs=data.result.thumbs;
  },
  [types.CHANGE_CONTACT_US_FLAG] (state,  data ) {
    state.contactUsFlag=true;
  },
  [types.GET_MAYBE_LIKE] (state,  data ) {
    state.maybeLike=data
  },
  [types.GET_MALL_HOT] (state,  data ) {
    state.mallHot=data
  },
  [types.GET_BANNERS] (state,  data ) {
    state.banners=data
  },
  [types.GET_CHEAPS] (state,  data ) {
    state.cheaps=data.list
    state.goodsTotalCount=data.totalCount;
    state.goodsPageSize=data.pageSize;
    state.goodsPageIndex=parseInt(data.pageIndex);
  }
}

