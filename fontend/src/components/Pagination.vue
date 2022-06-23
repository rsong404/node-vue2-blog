<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button v-for="(page, index) in NecessaryPage" :key="index" @click="$emit('getPageNo', page)" :class="{ active: pageNo == page }">
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
 </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 计算一共有多少页,用总的页数/每页展示的数据量，因为结果可能为小数，所有这里向上取整
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 技术所需几个显示分页
    NecessaryPage(){
      let pageList = []
      for (let i = 1; i <= this.startNumAndEndNum.end; i++) {
        if(i >= this.startNumAndEndNum.start)
          pageList.push(i)
      }
      return pageList
    },
    //计算出连续的页码的起始数字与结束数字[连续页码的数字:至少是3]
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this
      //先定义两个变量存储起始数字与结束数字
      let start = 0,
        end = 0
      //连续页码数字3
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        //起始数字
        start = pageNo - parseInt(continues / 2)
        //结束数字
        end = pageNo + parseInt(continues / 2)
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  text-align: center;
  margin-bottom: 10px;
  button {
    margin: 0 5px;
    margin-bottom: 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 4px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    width: 50px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: var(--blue3);
      color: var(--blue2);
    }
  }
}
.active {
  background: skyblue;
}
</style>

