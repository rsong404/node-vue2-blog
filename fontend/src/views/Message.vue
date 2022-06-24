<template>
  <div id="messageBox">
    <div id="messageContainer">
      <div id="message">
        <div id="header">
          <div id="avatar"></div>
          <input
            class="nick"
            v-model.trim="form.nick"
            type="text"
            placeholder=" 昵称（必填）"
          />
          <input
            class="nick"
            v-model.trim="form.email"
            type="text"
            placeholder=" 邮箱（选填）"
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
          class="iconfont icon-zhayan"
          @click.capture.stop="AddEmoji"
        ></div>
        <div id="submitButton">
          <button ref="center" type="primary" size="medium" @click="OnSubmit">
            发表评论
          </button>
        </div>
        <div id="emojiArr" v-show="emojiTurn">
          <span
            v-for="(item, index) in emoji"
            @click.stop="InsertEmoji(item)"
            :key="index"
            >{{ item }}</span
          >
        </div>
        <div ref="prompt" id="messagePrompt">{{ messagePrompt }}</div>
      </div>
    </div>
    <div id="messageListContainer" v-if="isRefresh">
      <div>全部评论 {{ messageList.length }} 条</div>
      <div id="messageItem" v-for="item in messageList" :key="item._id">
        <div id="messageAvatar">
          <img :src="item.avatar" />
        </div>
        <div id="messageItemContent">
          <div id="messageItemHeader">
            <div>{{ item.nick }}</div>
            <div>{{ item.time }}</div>
          </div>
          <div id="messageContent">
            {{ item.content }}
          </div>
          <!-- 回复的内容 -->
          <div v-if="item.reply">
            <div
              id="replyItem"
              v-for="replyItem in item.reply"
              :key="replyItem._id"
            >
              <div id="messageAvatar">
                <img src="../assets/logo.jpg" />
              </div>
              <div id="messageItemContent">
                <div id="messageItemHeader">
                  <div>{{ replyItem.nick }}</div>
                  <div>{{ replyItem.time }}</div>
                </div>
                <div id="messageContent">
                  {{ replyItem.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import emoji from "../utils/emoji";
import dayjs from "dayjs";
export default {
  data() {
    return {
      emoji: emoji,
      emojiTurn: false,
      form: {
        nick: "",
        avatar:
          "https://myvuepressblog-image.oss-cn-shenzhen.aliyuncs.com/avatar2.jpg",
        content: "",
        email: "",
        time: "",
      },
      messageList: [],
      messagePrompt: "评论成功",
      messagePromptTimer: null,
      isRefresh: true,
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
    RefreshMessage() {
      this.isRefresh = false;
      this.$nextTick(() => {
        this.isRefresh = true;
      });
    },
    MessagePrompt(message, cssVariable, cssVariableValue) {
      //提示相关
      this.messagePrompt = message;
      this.$refs.prompt.style.setProperty(cssVariable, cssVariableValue);
      clearTimeout(this.messagePromptTimer);
      this.$refs.prompt.classList.add("addPromptAnimation");
      this.messagePromptTimer = setTimeout(() => {
        this.$refs.prompt.classList.remove("addPromptAnimation");
      }, 1000);
    },
    async OnSubmit() {
      this.form.content = this.$refs.textarea.value.trim();
      // 新留言
      if (this.form.nick !== "" && this.form.content !== "") {
        let ePattern =/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (this.form.email !== "" && !ePattern.test(this.form.email)) {
          this.MessagePrompt("邮箱格式错误，请检查", "--color", "red");
          return;
        }
        let result = await this.$http.post("/message", this.form);
        if (result.data) {
          // 刷新评论
          this.GetMessageList();
          //提示
          this.MessagePrompt("评论成功", "--color", "skyblue");
          // 重置为空
          this.$refs.textarea.value = "";
          this.form.nick = "";
        }
      } else {
        this.MessagePrompt("表格不能为空，请检查", "--color", "red");
      }
    },
    AddEmoji() {
      this.emojiTurn = !this.emojiTurn;
    },
    KeyDown(e) {
      var event = e || window.event;
      var key = event.which || event.keyCode || event.charCode;
      if (key == 13) {
        this.OnSubmit();
      }
    },
    async GetMessageList() {
      let result = await this.$http.get("/message");
      this.messageList = result.data.reverse();
    },
  },
  mounted() {
    document.addEventListener("keydown", this.KeyDown);
    this.GetMessageList();
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.KeyDown);
  },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 520px) {
  #avatar {
    display: none !important;
  }
  .nick {
    width: calc(100% - 100px);
  }
}
#messageBox {
  width: 100%;
  padding: 15px;
  #messageContainer {
    width: 85%;
    margin: 0 auto;
    #header {
      height: 50px;
      width: 100%;
      align-content: center;
      display: flex;
      align-items: center;
      #avatar {
        display: inline-block;
        margin: 5px 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: burlywood;
        background-image: url("../assets/avatar2.jpg");
        background-size: cover;
        background-position: center;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .nick {
        margin: 0 5px;
        height: 30px;
        border: none;
        border-radius: 5px;
        background-color: #fdfdfd;
        &:focus {
          background-color: white;
          border: 1px rgb(23, 106, 139) solid;
          outline: none;
        }
      }
    }
    #textarea {
      width: 99%;
      height: 120px;
      resize: none;
      border: 0 steelblue solid;
      border-radius: 10px;
      outline: none;
      font-size: 16px;
      background-image: url(../assets/pinglun.png);
      background-position: center;
      background-size: cover;
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
      width: 100%;
      position: relative;
      #messagePrompt {
        --color: var(--blue3);
        display: inline-block;
        padding: 10px;
        background-color: var(--color);
        position: absolute;
        z-index: 9999;
        top: 80px;
        left: 50%;
        border-radius: 8px;
        transform: translateX(-50%);
        opacity: 0;
      }
      .addPromptAnimation {
        animation: Prompt 6s cubic-bezier(0.075, 0.52, 0.165, 1);
      }
      @keyframes Prompt {
        from {
          top: 80px;
          opacity: 1;
        }
        to {
          top: -80px;
          opacity: 0;
        }
      }
      #emojiArr {
        position: absolute;
        z-index: 999;
        width: 100%;
        padding: 4px;
        background-color: rgb(240, 240, 240);
        top: 40px;
        span {
          font-size: 21px;
          cursor: pointer;
        }
        transition: 1s;
      }
      #submitButton {
        display: inline-block;
        margin-right: 4px;
        position: absolute;
        right: 0;
      }
      #emoji {
        display: inline-block;
        font-size: 24px;
        &:hover {
          cursor: pointer;
          color: #66bfff;
        }
      }
    }
  }
  #messageListContainer {
    width: 100%;
    margin-top: 100px;
    padding-bottom: 20px;
    background-color: var(--blue1);
    #messageItem {
      display: flex;
      flex-wrap: nowrap;
      box-shadow: var(--shadow2);
      margin: 10px 0;
      background-color: var(--blue2);
      #messageAvatar {
        width: 40px;
        height: 40px;
        margin: 10px;
        img {
          width: 100%;
          border-radius: 20px;
        }
      }
      #messageItemContent {
        flex: 1;
        #messageItemHeader {
          display: flex;
          justify-content: space-between;
          margin: 10px;
          & > div {
            display: inline-block;
          }
        }
        #messageContent {
          margin: 10px 5px;
        }
        #replyItem {
          display: flex;
          flex-wrap: nowrap;
          margin: 10px 0;
          background-color: var(--blue2);
          margin: 5px;
          font-size: 14px;
          img {
            width: 35px;
          }
        }
      }
    }
  }
}
</style>