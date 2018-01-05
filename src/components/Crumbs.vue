<template>
	<div class="crumbs">
    当前位置：
    <div class="crumbsCate">
      <a href="/">
        <span>首页</span>
      </a>
    </div>
    <span class="arrow">&gt;</span>
    {{Particulars}}
  </div>
</template>

<script>
  export default{
    name:"crumbs",
    props:{
      Particulars:{
        default:'详情'
      }
    }
  }
</script>
