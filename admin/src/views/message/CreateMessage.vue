<template>
  <div id="messageBox">
    <div id="messageContainer">
      <div id="message">
        <div id="header">
          <div id="avatar">
            <img src="../../../public/avatar/avatar2.jpg" />
          </div>
          <input
            id="nick"
            v-model.trim="form.nick"
            type="text"
            placeholder=" 昵称（必填）"
            :disabled='itemData?true:false'
          />
        </div>
        <textarea
          id="textarea"
          ref="textarea"
          placeholder=" 请输入输入留言"
        ></textarea>
      </div>
      <div id="foot">
        <div
          id="emoji"
          class="iconfont icon-biaoqing"
          @click.capture="AddEmoji"
        >
          <div id="emojiArr" v-show="emojiTurn">
            <span
              v-for="(item, index) in emoji"
              @click.stop="InsertEmoji(item)"
              :key="index"
              >{{ item }}</span
            >
          </div>
        </div>
        <div>
          <el-button
            id="button"
            ref="center"
            type="primary"
            size="medium"
            @click="OnSubmit"
            >发表评论</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import emoji from '../../utils/emoji'
export default {
  props:['itemData'],
  data() {
    return {
      emoji:emoji,
      emojiTurn: false,
      form: {
        nick: "",
        avatar:
          "https://gitee.com/rs404/picgo_img/raw/master/images/avatar2.jpg",
        content: "",
        time: "",
      },
    };
  },
  computed: {
    textarea() {
      return this.$refs.textarea;
    },
  },
  methods: {
    InsertEmoji(emoji) {
      // ++++++++++++++++++++++++++++++++++
      let start = this.textarea.selectionStart;
      let end = this.textarea.selectionEnd;
      if (start !== end) {
        let content2 = this.textarea.value;
        let deleteString = this.textarea.value.substring(start, end);
        this.textarea.value = content2.replace(deleteString, "");
        //将之前的end光标设和Start光标一致
      }
      let content3 = this.textarea.value;
      this.textarea.value = `${content3.slice(
        0,
        start
      )}${emoji}${content3.slice(start)}`;

      //插入表情之后将光标移到表情的后面并且将end光标移到和start光标一起
      this.textarea.selectionStart = start + 2;
      this.textarea.selectionEnd = this.textarea.selectionStart;
      this.textarea.focus();
    },

    async OnSubmit() {
      this.form.content = this.$refs.textarea.value.trim();
      // 先判断是回复还是新留言
      // 回复
      if(this.itemData){
        if(this.form.content !== ''){
          let replyData = {parentId:this.itemData._id,...this.form}
          let result = await this.$http.get('/message',{params:{_id:this.itemData._id}})
          result.data[0].reply.push(replyData)
          await this.$http.put('/message',result.data[0],{params:{_id:result.data[0]._id}})
          this.$message.success('回复成功！')
          this.$router.push({name:'messageList'})
        }
        return
      }


      // 新留言
      if (this.form.nick !== "" && this.form.content !== "") {
        let result = await this.$http.post("/message", this.form);
        if (result.data) {
          this.$message.success("留言成功");
          this.$refs.textarea.value = "";
          this.form.nick = "";
          this.$router.push({name:'messageList'})
        }
      } else {
        this.$message.error("表格不能为空，请检查。");
      }
    },
    AddEmoji() {
      this.emojiTurn = !this.emojiTurn;
    },
    async KeyDown(e){
      var event = e || window.event;
        var key = event.which || event.keyCode || event.charCode;
        if (key == 13) {
          this.OnSubmit();
        }
    }
    
  },
  mounted() {
    if(this.itemData){
      this.form.nick = `作者 回复 ${this.itemData.nick}` 
    }
      document.addEventListener("keydown",this.KeyDown);
    },
    beforeDestroy() {
    document.removeEventListener('keydown',this.KeyDown)
  },
};
</script>
<style lang="scss" scoped>
#header {
  height: 50px;
  width: 100%;
  position: relative;
  align-content: center;
  // background-color: cadetblue;
  #avatar {
    display: inline-block;
    margin: 5px 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: burlywood;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  #nick {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: #f2f3f5;
    &:focus {
      background-color: white;
      border: 1px rgb(23, 106, 139) solid;
      outline: none;
    }
  }
}

#messageBox {
  width: 100%;
}
#messageContainer {
  width: 50%;
  margin: 0 auto;
  #textarea {
    width: 99%;
    height: 120px;
    resize: none;
    background-color: #f2f3f5;
    border: 0 steelblue solid;
    border-radius: 10px;
    outline: none;
    font-size: 16px;
    &:focus {
      background-color: rgb(255, 255, 255);
      border: rgb(56, 153, 192) 1px solid;
    }
  }
  #message {
    width: 100%;
    margin: 0 auto;
  }
  #foot {
    display: flex;
    justify-content: space-between;
    #emoji {
      font-size: 20px;
      position: relative;

      &:hover {
        cursor: pointer;
      }
      #emojiArr {
        position: absolute;
        width: 200px;
        padding: 4px;
        background-color: rgb(240, 240, 240);
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        span {
          cursor: pointer;
        }
        transition: 1s;
      }
    }
  }
}
</style>