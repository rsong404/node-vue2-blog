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
        <el-select
          v-model="form.cateName"
          placeholder="请选择分类"
          @change="CateSelect"
        >
          <el-option
            v-for="item in this.categoryData"
            :key="item._id"
            :label="item.cateName"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加标签">
        <el-select
          disabled
          v-model="form.tags"
          multiple
          filterable
          allow-create
          placeholder="输入标签并选中"
        >
        </el-select>
      </el-form-item>
      <el-form-item label="文章封面图地址">
        <el-col :span="12">
          <el-input v-model="form.coverPicture"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="文章内容">
        <div id="editor"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
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
      oriTag: "",
      cateId: "",
      editor: null,
      form: {
        title: "",
        userName: "",
        cateName: "",
        cid: "",
        tags: [],
        tagsId: [],
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
        this.form[key] = this.$route.params[key];
      }

      // //让分类正常显示
      this.cateId = this.form.cid;
      this.form.cid = this.form.cateName;
      this.oriTag = this.form.tags;
    },
    CateSelect(value) {
      for (let index = 0; index < this.categoryData.length; index++) {
        if (this.categoryData[index]._id == value) {
          this.form.cateName = this.categoryData[index].cateName;
        }
      }
      console.log(this.form.cateName);
    },
    async GetCateData() {
      let result = await this.$http.get("/category");
      this.categoryData = result.data;
    },
    async onSubmit() {
      if (this.if_obj_is_null(this.form) == 0) {
        if (this.form.cid === this.form.cateName) {
          this.form.cid = this.cateId;
        }
        //如果文章tag被修改则向数据库删除旧的tag并添加新tag
        // if (this.oriTag !== this.form.tag) {
        //   //删除旧tag
        //   await this.$http.delete('/tag',{params:{_id:this.form.tagId}})
        //   //添加新tag
        //   let tag = {tagName: this.form.tag, };
        //   let result = await this.$http.post("/tag", tag);
        //   //将新tagId赋值给form
        //   this.form.tagId = result.data._id
        // }
        await this.$http.put(
          "/article",
          this.CompareObj(this.$route.params, this.form),
          { params: { _id: this.form._id } }
        );

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
        if (obj.hasOwnProperty(key)) {
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
        if (JSON.stringify(oriObj[key]) !== JSON.stringify(newObj[key])) {
          obj[key] = newObj[key];
        }
      }
      return obj;
    },
  },
  created() {
    this.GetCateData();
    this.InitArticleData();
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