<template>
  <div class="search-input">
    <div class="search-input-header">
      <img src="@/assets/search.png" alt="" />
    </div>
    <div class="search-input-box">
      <a-input
        v-model:value="searchValue"
        placeholder="请输入关键字检索"
        @keyup.enter.native="search"
      />
      <a-popover v-model:open="voiceVisible" trigger="click">
        <template #content>
          <p>按住按钮以录音</p>
          <p>正在录音中......</p>
        </template>
        <div
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
          class="search-icon"
        >
          <img
            v-show="recording"
            src="@/assets/voice.gif"
            style="cursor: pointer; width: 40px; height: 40px"
            alt=""
          />
          <img
            v-show="!recording"
            src="@/assets/icon-microphone.svg"
            style="
              cursor: pointer;
              width: 20px;
              height: 20px;
              margin-right: 2px;
            "
            alt=""
          />
        </div>
      </a-popover>
      <a-button type="primary" @click="search">
        <template #icon>
          <img src="@/assets/icon-search.svg" alt="" />
        </template>
        搜索
      </a-button>
      <a-modal
        title="提示"
        v-model:open="visible"
        ok-text="确认"
        cancel-text="取消"
        @ok="handleOk"
      >
        <div style="width: 100%" class="mt10">
          <div>
            1.复制以下内容到浏览器检索框，进入浏览器授权页（其他浏览器请自行查阅）
          </div>
          <div style="display: flex; align-items: center">
            <img :src="chrome" alt="chrome" />
            <span class="ml10"
              >chrome://flags/#unsafely-treat-insecure-origin-as-secure</span
            >
          </div>
          <div class="mt10" style="display: flex; align-items: center">
            <img :src="edge" alt="edge" />
            <span class="ml10"
              >edge://flags/#unsafely-treat-insecure-origin-as-secure</span
            >
          </div>
        </div>
        <div style="width: 100%" class="mt10">
          <div>
            2.将ip地址加端口或者完整域名添加至白名单后重启浏览器即可（示例为谷歌浏览器）
          </div>
          <img :src="img" style="width: 100%" class="mt10" alt="example" />
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { Button, Input, Modal, Popover } from "ant-design-vue";
import axios from "axios";
import { onMounted, reactive, ref, toRefs, watch } from "vue";
import chrome from "./icon/icon_chrome.png";
import edge from "./icon/icon_edge.png";
import img from "./icon/img.png";
import useMediaRecorder from "./useMediaRecorder";

export default {
  name: "SearchInput",
  components: {
    AButton: Button,
    AInput: Input,
    AModal: Modal,
    APopover: Popover,
  },
  props: {
    type: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
  },
  emits: ["tagsToIndexvue"],
  setup(props, { emit }) {
    const state = reactive({
      searchValue: props.value,
      recording: false,
      visible: false,
      voiceVisible: false,
      chrome,
      edge,
      img,
    });
    // console.log("state", state);

    watch(
      () => props.value,
      (newVal) => {
        state.searchValue = newVal;
        if (newVal) {
          search();
        }
      }
    );

    const handleOk = () => {
      state.visible = false;
    };

    const handleAudioStop = (base64Data) => {
      state.searchValue = base64Data; // 更新输入框的值
    };

    const { startRecord, stopRecord, clearBlobUrl } = useMediaRecorder({
      onAudioStop: handleAudioStop,
    });

    const recording = ref(false);

    const handleMouseDown = function () {
      startRecord()
        .then(() => {
          recording.value = true;
          state.voiceVisible = true;
        })
        .catch(handleRecordError);
    };

    const handleMouseUp = async function () {
      await stopRecord();
      state.voiceVisible = false;
      recording.value = false;
      handleAudioStop(); // 在这里调用 handleAudioStop 函数
      clearBlobUrl();
    };

    const handleRecordError = async function (error) {
      try {
        state.visible = true;
      } catch (e) {
        console.error("处理弹窗异常:", e);
      }
    };

    window.addEventListener("audioProcessed", (event) => {
      // 更新状态或执行其他操作
      state.searchValue = event.detail.text;
      search(); //20240329语音转文字后直接搜索
    });

    const search = async () => {
      const keyword = state.searchValue;
      if (props.type === "home") {
        emit("tagsToIndexvue", keyword);
      } else {
        const params = {
          content: keyword,
        };

        // const apiUrl = `http://192.168.1.190:8080/zhangjiang/search?${new URLSearchParams(
        //   params
        // )}`;
        const apiUrl = `http://172.18.192.66:8500/zhangjiang/search?${new URLSearchParams(
          params
        )}`;

        try {
          const response = await axios.get(apiUrl);

          // 处理响应数据
          const responseData = response.data;
          const tags = convertResponseToTags(responseData.data);

          // 使用 tags 或者触发其他逻辑

          // 触发自定义事件，将tags传递给父组件
          emit("tagsToIndexvue", tags, keyword);
        } catch (error) {
          // 处理请求错误
          console.error("Error fetching data:", error);
        }
      }
    };

    const convertResponseToTags = (responseData) => {
      // 解析响应数据，转换成 tags 数组
      const data = responseData;

      if (Array.isArray(data)) {
        return data.map((item, index) => {
          // 假设 name 是 text，label 是 text 的第一个字
          const label = item.text.charAt(0);

          return {
            name: item.text ? item.text.trim() : "",
            label,
            id: `${index + 1}`,
          };
        });
      }

      return data;
    };

    onMounted(() => {
      if (props.value) {
        search();
      }
    });

    return {
      ...toRefs(state),
      handleMouseDown,
      handleMouseUp,
      search,
      recording,
      handleOk,
    };
  },
};
</script>

<style lang="less">
.mt10 {
  margin-top: 10px;
}

.search-input {
  width: 100%;
  height: 251px;
  padding-top: 56px;
  text-align: center;

  &-header {
    width: 100%;
    margin-bottom: 24px;
  }

  &-box {
    width: 900px;
    height: 46px;
    display: flex;
    margin: 0 auto;
    background: #fff;
    border-radius: 6px;
    padding-right: 6px;
    align-items: center;

    .ant-input {
      border: none;
      width: calc(100% - 136px);

      &:focus {
        border: none;
        box-shadow: none;
      }
    }

    .search-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-right: 10px;
    }

    .ant-btn {
      width: 102px;
      height: 38px;
      display: flex;
      padding: 0 16px;
      font-size: 16px;
      font-weight: 600;
      align-items: center;

      img {
        margin-right: 10px;
      }
    }
  }
}
</style>
