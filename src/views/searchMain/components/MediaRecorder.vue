<script setup>
import { Microphone } from "@element-plus/icons-vue";
import saveAs from "file-saver";
import { defineEmits, defineProps, ref, watch } from "vue";
import useMediaRecorder from "./useMediaRecorder";

const emits = defineEmits(["getBase64"]);
const props = defineProps({
  size: {
    type: String,
    default() {
      return "20px";
    },
  },
  color: {
    type: String,
    default() {
      return "rgb(138, 146, 160)";
    },
  },
});

const { mediaUrl, mediaBlobs, base64, startRecord, stopRecord, clearBlobUrl } =
  useMediaRecorder();
const recording = ref(false);
const audio = ref(null);
const playAudio = async function () {
  audio.value.play();
};
const pauseAudio = function () {
  audio.value.pause();
};
const download = function () {
  const blob = new Blob(mediaBlobs.value, { type: "audio/wav" });
  saveAs(blob, "test.wav");
};

const handleMouseDown = function () {
  startRecord().then(() => {
    recording.value = true;
  });
};

const handleMouseUp = async function () {
  await stopRecord();
  recording.value = false;
  clearBlobUrl();
};

watch(
  () => base64.value,
  function (val) {
    if (val) {
      emits("getBase64", val);
    }
  }
);
</script>

<template>
  <div
    :style="{ width: props.size, height: props.size }"
    style="position: relative"
  >
    <Microphone
      :style="{ width: props.size, color: props.color }"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      style="cursor: pointer"
    />
    <audio :src="mediaUrl" controls style="display: none" ref="audio" />
    <img src="./yuyin.gif" class="yuyin" v-if="recording" />
  </div>

  <!--    <button @click="startRecord">开始</button>-->
  <!--    <button @click="pauseRecord">暂停</button>-->
  <!--    <button @click="resumeRecord">恢复</button>-->
  <!--    <button @click="stopRecord">停止</button>-->
  <!--    <button @click="playAudio">播放</button>-->
  <!--    <button @click="pauseAudio">暂停</button>-->
  <!--    <button @click="download">下载</button>-->
</template>

<style scoped lang="scss">
.yuyin {
  position: absolute;
  left: -215px;
  top: -7px;
  width: 200px;
  height: 29px;
}
:deep {
  svg {
    width: 16px;
    height: 16px;
  }
}
</style>
