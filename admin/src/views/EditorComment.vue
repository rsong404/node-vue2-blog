<template>
  <div>
    <el-form ref="form" :model="form" size="medium" label-width="auto">
      <el-form-item label="说说内容">
        <div id="editor"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
        content: "",
        time: "default",
      },
    };
  },
  methods: {
    InitData() {
      this.form["content"] = this.$route.params["content"];
      console.log(this.$route.params)
    },
    InitEditor() {
      const editor = new E("#editor");
      editor.highlight = hljs;
      editor.config.zIndex = 0;
      editor.config.onchangeTimeout = 700; // 修改为 500ms
      editor.create();
      // 配置 onchange 回调函数，将数据同步到 vue 中
      editor.config.onchange = (newHtml) => {
        this.form.contents = newHtml;
      };
      //将原内容添加到编辑器中
      editor.txt.html(this.form.content);
      this.editor = editor;
    },
    async onSubmit() {
      if (this.form.content !== "") {
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
  created() {
    this.InitData();
  },
  mounted() {
    this.InitEditor();
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
};
</script>