<template>
  <div style="margin-top:26px">
    <el-form size="medium" label-width="auto">
      <el-form-item label="说说内容">
        <div id="editor"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import E from "wangeditor";
import hljs from "highlight.js";
export default {
  data() {
    return {
      editor: null,
      form: {
        content:'',
        time: "default",
      },
    };
  },
  methods: {
    async onSubmit() {
      if (this.form.content !== '') {
        //添加说说
        await this.$http.post("/comment", this.form);
        this.$message.success("说说发表成功！");
        //跳转到文章列表页面
        this.$router.push("/commentList");
      } else {
        this.$message.error("表格不能为空，请检查！");
      }
    },
    
  },

  mounted() {
    const editor = new E("#editor");
    editor.highlight = hljs;
    editor.config.zIndex = 1000;
    editor.config.onchangeTimeout = 500; // 修改为 500ms
    editor.create();
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.form.content = newHtml;
    };
    this.editor = editor;
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
};
</script>