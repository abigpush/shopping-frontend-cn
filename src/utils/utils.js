//工具函数
import qs from 'qs';

//url拼接 去除空值的option
export const  createUrl=obj=>{
  const  newObj={};
    for(var v in obj){
      if(obj[v]!=""){
        newObj[v] = obj[v]
      }
    }
    return qs.stringify(newObj);
}

//将 毫秒数的时间换算成 展示时间
export const changeTime=t=>{
  var publishTime = parseInt(t)/ 1000,
    d_seconds,
    d_minutes,
    d_hours,
    d_days,
    timeNow = parseInt(new Date().getTime() / 1000),
    d,

    date = new Date(publishTime * 1000),
    Y = date.getFullYear(),
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  //小于10的在前面补0
  if (M < 10) {
    M = '0' + M;
  }
  if (D < 10) {
    D = '0' + D;
  }
  if (H < 10) {
    H = '0' + H;
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }

  d = timeNow - publishTime;
  d_days = parseInt(d / 86400);
  d_hours = parseInt(d / 3600);
  d_minutes = parseInt(d / 60);
  d_seconds = parseInt(d);

  if (d_days > 0 && d_days < 3) {
    //if(d_days==1)return  d_days + ' day ago';
    return d_days + ' 天前';
  } else if (d_days <= 0 && d_hours > 0) {
    //if(d_hours==1)return  d_hours + ' hour ago';
    return d_hours + ' 小时前';
  } else if (d_hours <= 0 && d_minutes > 0) {
    //if(d_minutes==1)return  d_minutes + ' minute ago';
    return d_minutes + ' 分钟前';
  } else if (d_seconds < 60) {
    if (d_seconds <= 0) {
      return '刚刚';
    } else {
      //if(d_seconds==1)return  d_seconds + ' second ago';
      return d_seconds + ' 秒前';
    }
  } else if (d_days >= 3 && d_days < 30) {
    return M + '-' + D + ' ' + H + ':' + m;
  } else if (d_days >= 30) {
    return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
  }

}


//将 HTML<a>中的调转地址 去掉
export const ignoreLink=h=>{
  //return   h.replace(/href=\"(.*?)\"/g, "href=\"Javascript:;\"")
  return   h.replace(/href=\"(.*?)\"/g, "")
}
//根据原价与现价 算出 打折比率
export const getOff=(price,originalPrice)=>{
      price =price.split("$")[1];
      originalPrice =originalPrice.split("$")[1];
    return   Math.ceil(100-price/originalPrice*100);
}
