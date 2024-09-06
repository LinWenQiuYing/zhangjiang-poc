import axios from "axios";
import { ref } from "vue";

const useMediaRecorder = ({ onAudioStop }) => {
  const mediaUrl = ref("");
  const mediaStream = ref();
  const mediaRecorder = ref();
  const mediaBlobs = ref([]);
  const base64 = ref("");
  const startRecord = async () => {
    base64.value = "";
    mediaStream.value = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    mediaRecorder.value = new MediaRecorder(mediaStream.value);

    mediaRecorder.value.ondataavailable = (blobEvent) => {
      mediaBlobs.value.push(blobEvent.data);
    };
    mediaRecorder.value.onstop = async () => {
      const blob = new Blob(mediaBlobs.value, { type: "audio/wav" });
      const url = URL.createObjectURL(blob);
      base64.value = await blobToBase64(blob);
      mediaUrl.value = url;
    };

    mediaRecorder.value?.start();
    return Promise.resolve();
  };

  const pauseRecord = async () => {
    mediaRecorder.value?.pause();
  };

  const resumeRecord = async () => {
    mediaRecorder.value?.resume();
  };

  const stopRecord = async () => {
    mediaRecorder.value?.stop();
    mediaStream.value?.getTracks().forEach((track) => track.stop());
    mediaBlobs.value = [];
  };

  const blobToBase64 = function (
    blob = new Blob(mediaBlobs.value, { type: "audio/wav" })
  ) {
    return new Promise(async (resolve, reject) => {
      sendBinaryAudioToServer(blob);
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onload = async function () {
        const base64 = reader.result;
        resolve(base64);

        // 将音频数据发送到服务器
        // const resStr = await sendAudioToServer(base64);
        const resStr = "";

        // 触发外部回调
        if (onAudioStop) {
          onAudioStop(resStr);
        }
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const clearBlobUrl = () => {
    if (mediaUrl.value) {
      URL.revokeObjectURL(mediaUrl.value);
    }
    mediaUrl.value = "";
  };

  const sendAudioToServer = async (base64Data) => {
    try {
      // 发送 HTTP 请求
      const response = await axios.post(
        "http://172.18.192.66:8500/zhangjiang/audioConvert",
        {
          base64Audio: base64Data,
        }
      );

      // 处理服务器响应，根据需要执行相关逻辑

      // 获取服务器返回的文本信息
      const serverText = response.data.text;

      // 在这里处理服务器返回的文本信息，将其存储或执行其他操作

      // 将文本信息传递给 searchInput 组件
      // 这里你可以使用事件、props 或 Vuex 等方式进行传递
      // 以事件为例：
      const event = new CustomEvent("audioProcessed", {
        detail: { text: serverText },
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Error sending audio to server:", error);
    }
  };

  const sendBinaryAudioToServer = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append("base64Audio", audioBlob, "audio.wav");

      const response = await axios.post(
        //"http://192.168.1.190:8080/zhangjiang/audioConvertReal",
        "http://172.18.192.66:8500/zhangjiang/audioConvertReal",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const serverText = response.data.data;

      const event = new CustomEvent("audioProcessed", {
        detail: { text: serverText },
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Error sending audio to server:", error);
    }
  };

  return {
    mediaUrl,
    mediaBlobs,
    base64,
    startRecord,
    pauseRecord,
    resumeRecord,
    stopRecord,
    clearBlobUrl,
  };
};
export default useMediaRecorder;
