<template>
  <div>
    <el-form ref="form" :model="form" size="medium" label-width="auto">
      <el-form-item label="文章标题">
        <el-col :span="12">
          <el-input v-model="form.title" width="100px"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="作者姓名">
        <el-col :span="12">
          <el-input v-model="form.userName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.cateName" placeholder="请选择分类">
          <el-option
            v-for="item in this.categoryData"
            :key="item._id"
            :label="item.cateName"
            :value="item.cateName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加标签">
        <el-select
          v-model="form.tags"
          multiple
          filterable
          allow-create
          placeholder="输入标签并选中"
        >
        </el-select>
      </el-form-item>
      <el-form-item label="文章封面图">
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3000/admin/api/upload"
            list-type="picture"
            :headers="headers"
            :on-success="SuccessUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="置顶数">
        <el-col :span="12">
          <el-input-number
            v-model="form.stick"
            :min="0"
            :max="10"
            label="数字越大级别越高"
          ></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item label="文章内容">
        <div id="editor"></div>
      </el-form-item>
      <el-form-item>
        <button id="button" @click.prevent="OnSubmit">立即创建</button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import E from "wangeditor";
import hljs from "highlight.js";

export default {
  inject: ["reload"],
  data() {
    return {
      headers: {
        Authorization: "",
      },
      imageUrl: "",
      categoryData: [],
      tagValue: [],
      editor: null,
      form: {
        title: "",
        userName: "",
        cateName: "",
        stick: 0,
        tags: [],
        coverPicture: "",
        contents: "",
        time: "default",
      },
    };
  },
  methods: {
    async GetCateData() {
      let result = await this.$http.get("/category");
      this.categoryData = result.data.reverse();
    },
    async OnSubmit() {
      if (this.if_obj_is_null(this.form) == 0) {
        //向数据库添加tag
        let tagList = [];
        for (let index = 0; index < this.form.tags.length; index++) {
          tagList.push({ tagName: this.form.tags[index] });
        }
        await this.$http.post("/tag", tagList);
        //添加文章
        if (this.form.coverPicture === "")
          this.form.coverPicture =
            "https://cdn.jsdelivr.net/gh/rsong404/vuepress_img@master/images/articleCover.jpg";
        await this.$http.post("/article", this.form);
        this.$message.success("文章发表成功！");
        //跳转到文章列表页面
        this.$router.push("/articleList");
      } else {
        this.$message.error("表格不能为空，请检查！");
      }
    },
    getEditorData() {
      // 通过代码获取编辑器内容
      this.editor.txt.html();
    },
    // 判断一个对象下是否有空属性
    if_obj_is_null(obj) {
      let i = 0;
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && key !== "coverPicture") {
          if (obj[key] === null || obj[key] === "") {
            i++;
          }
        }
      }
      return i;
    },
    SuccessUpload(res) {
      this.imageUrl = res;
      this.form.coverPicture = res;
    },
  },
  created() {
    this.GetCateData();
    this.headers.Authorization = window.localStorage.token;
  },
  mounted() {
    const editor = new E("#editor");
    editor.highlight = hljs;
    editor.config.zIndex = 0;
    editor.config.onchangeTimeout = 700; // 修改为 500ms
    editor.create();
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.form.contents = newHtml;
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
<style lang="scss" scoped>
.el-upload {
  border: 1px dashed #6b6b6b;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
  border: 2px dashed #6b6b6b;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  border: 1px dashed #6b6b6b;
  width: 178px;
  height: 178px;
  display: block;
}
</style>