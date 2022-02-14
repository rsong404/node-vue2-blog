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
      <el-form-item label="文章封面图地址">
        <el-col :span="12">
          <el-input v-model="form.coverPicture"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="置顶数">
        <el-col :span="12">
        <el-input
          type="number"
          placeholder="数字越小排列越前，最小为1，默认为0为无"
          v-model="form.stick"
          maxlength="1"
          show-word-limit
        >
        </el-input>
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
      removeTag: [],
      oriTag: "",
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
    InitArticleData() {
      //将路由传过来的数据实现浅复制，再赋值给form
      for (const key in this.$route.params) {
        this.form[key] = this.$route.params[key];
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
    async onSubmit() {
      if (this.if_obj_is_null(this.form) == 0) {
        //添加tag
        if (this.oriTag !== JSON.stringify(this.form.tags)) {
          for (let index = 0; index < this.form.tags.length; index++) {
            //查看数据库是否已存在该标签
            let result = await this.$http.get("/tag", {
              params: { tagName: this.form.tags[index] },
            });
            if (result.data.length == 0) {
              let tag = {
                tagName: this.form.tags[index],
              };
              await this.$http.post("/tag", tag);
            }
          }
        }
        await this.$http.put(
          "/article",
          this.CompareObj(this.$route.params, this.form),
          { params: { _id: this.form._id } }
        );

        this.reload();
        this.$message.success("文章修改成功！");
        if (this.removeTag.length >= 1) {
          for (let index = 0; index < this.removeTag.length; index++) {
            let result = await this.$http.get("/tag", {
              params: { tagName: this.removeTag[index] },
            });
            //如果该标签下只有一篇文章与之关联，则可以将该标签删掉
            if (
              JSON.stringify(result.data) !== "[]" &&
              result.data[0].items.length <= 1
            ) {
              await this.$http.delete("/tag", {
                params: { tagName: this.removeTag[index] },
              });
            }
          }
        }
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