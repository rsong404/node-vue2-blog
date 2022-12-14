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
          @remove-tag="RemoveSelect"
        >
        </el-select>
      </el-form-item>
      <el-form-item label="图片地址">
        <el-col :span="12">
          <el-input placeholder="请输入图片地址" v-model="form.coverPicture">
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="文章封面图地址">
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action="https://kkan.top/admin/api/upload"
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
        <button id="button" @click.prevent="onSubmit">确认修改</button>
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
      categoryData: [],
      removeTag: [],
      oriTag: "",
      editor: null,
      headers: {
        Authorization: "",
      },
      imageUrl: "",
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
    InitArticleData() {
      //将路由传过来的数据实现浅复制，再赋值给form
      for (const key in this.$route.params) {
        if (this.$route.params.hasOwnProperty(key)) {
          this.form[key] = this.$route.params[key];
        }
      }

      this.oriTags = JSON.stringify(this.form.tags);
    },
    async RemoveSelect(value) {
      this.removeTag.push(value);
    },
    async GetCateData() {
      let result = await this.$http.get("/category");
      this.categoryData = result.data.reverse();
    },
    SuccessUpload(res) {
      this.imageUrl = res;
      this.form.coverPicture = res;
    },
    async onSubmit() {
      if (this.if_obj_is_null(this.form) == 0) {
        await this.$http.put(
          "/article",
          this.CompareObj(this.$route.params, this.form),
          { params: { _id: this.form._id } }
        );
        //看有没有新添加的tag，有就向数据库添加tag
        let tagList = [];
        let newTagList = []
        newTagList = this.form.tags.filter(item => !this.$route.params.tags.includes(item))
        for (let index = 0; index < newTagList.length; index++) {
          tagList.push({ tagName: this.form.tags[index] });
        }
        await this.$http.post("/tag", tagList);
        this.reload();
        this.$message.success("文章修改成功！");
        this.$router.push("/articleList");
      } else {
        this.$message.error("表格不能为空，请检查！");
      }
    },
    InitEditor() {
      // 通过代码获取编辑器内容
      const editor = new E("#editor");
      editor.highlight = hljs;
      editor.config.zIndex = 0;
      editor.config.onchangeTimeout = 700; // 修改为 500ms
      editor.create();
      // 配置 onchange 回调函数，将数据同步到 vue 中
      editor.config.onchange = (newHtml) => {
        this.form.contents = newHtml;
      };
      editor.txt.html(this.form.contents);
      this.editor = editor;
    },
    // 判断一个对象下是否有空属性
    if_obj_is_null(obj) {
      let i = 0;
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && key != "coverPicture") {
          if (obj[key] === null || obj[key] === "") {
            i++;
          }
        }
      }
      return i;
    },
    CompareObj(oriObj, newObj) {
      let obj = {};
      for (const key in oriObj) {
        if (oriObj.hasOwnProperty(key)) {
          if (JSON.stringify(oriObj[key]) !== JSON.stringify(newObj[key])) {
            obj[key] = newObj[key];
          }
        }
      }
      return obj;
    },
  },
  created() {
    this.GetCateData();
    this.InitArticleData();
    this.headers.Authorization = window.localStorage.token;
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