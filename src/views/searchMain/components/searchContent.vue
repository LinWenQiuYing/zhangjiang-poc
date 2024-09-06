<template>
  <div class="search-content">
    <div class="search-content-header">
      <img class="header-img" src="@/assets/租.png" alt="" />
      <span class="header-text">{{ position.sjly }}</span>
      <!-- <span class="header-sub"
        >（数据来源：资产运营系统，截止时间：2023年12月）</span
      > -->
    </div>
    <div class="search-content-body">
      <!-- <img src="@/assets/pic1.png" alt="" v-show="isImg1Show" />
      <img src="@/assets/pic2.png" alt="" v-show="isImg2Show" />
      <img src="@/assets/pic3.png" alt="" v-show="isImg3Show" />
      <img src="@/assets/pic3-1.png" alt="" v-show="isImg3Show" />
      <img src="@/assets/pic4.png" alt="" v-show="isImg4Show" />
      <img src="@/assets/pic4-1.png" alt="" v-show="isImg4Show" />
      <img src="@/assets/pic4-2.png" alt="" v-show="isImg4Show" /> -->
      <div
        class="search-content-body-iframe"
        :style="{
          width: position.width + 'px',
          height: position.height + 'px',
        }"
      >
        <iframe
          :src="position.iframeUrl"
          scrolling="no"
          :style="{
            position: 'relative',
            top: position.top + 'px',
            left: position.left + 'px',
            width: '1920px',
            height: '8200px',
          }"
        ></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive, watch } from "vue";
export default {
  name: "SearchContent",
  props: {
    value: {
      type: String,
      default: "",
    },
    iframeParams: {
      type: Object,
    },
  },
  setup(props) {
    const searchValue = computed(() => {
      return props.value;
    });

    const position = reactive({
      iframeUrl: "",
      // iframeUrl: "",
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      sjly: "",
    });

    // console.log("searchValue", searchValue);
    // const isImg1Show = computed(() => {
    //   if (!searchValue.value) return false;
    //   if (
    //     searchValue.value.includes("资产") ||
    //     searchValue.value.includes("负债") ||
    //     searchValue.value.includes("收入") ||
    //     searchValue.value.includes("利润") ||
    //     searchValue.value.includes("收益") ||
    //     searchValue.value.includes("融资") ||
    //     searchValue.value.includes("财务") ||
    //     searchValue.value.includes("债券") ||
    //     searchValue.value.includes("借款") ||
    //     searchValue.value.includes("到期")
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
    // const isImg2Show = computed(() => {
    //   if (!searchValue.value) return false;
    //   if (
    //     searchValue.value.includes("自持") ||
    //     searchValue.value.includes("面积") ||
    //     searchValue.value.includes("可出租") ||
    //     searchValue.value.includes("车库") ||
    //     searchValue.value.includes("物业") ||
    //     searchValue.value.includes("用房") ||
    //     searchValue.value.includes("管理") ||
    //     searchValue.value.includes("辅助") ||
    //     searchValue.value.includes("人防") ||
    //     searchValue.value.includes("空置")
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
    // const isImg3Show = computed(() => {
    //   if (!searchValue.value) return false;
    //   if (
    //     searchValue.value.includes("公寓") ||
    //     searchValue.value.includes("公寓租赁") ||
    //     searchValue.value.includes("公寓办公") ||
    //     searchValue.value.includes("公寓办公租赁收缴率") ||
    //     searchValue.value.includes("办公年度平均出租率")
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
    // const isImg4Show = computed(() => {
    //   if (!searchValue.value) return false;
    //   if (
    //     searchValue.value.includes("商业租赁") ||
    //     searchValue.value.includes("商业租赁收缴率") ||
    //     searchValue.value.includes("商业年度平均出租率")
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
    watch(props.iframeParams, (newValue) => {
      // console.log("监听到了", newValue);
      position.iframeUrl = newValue.iframeUrl;
      // position.iframeUrl = "http://localhost:8088/#/search";
      position.top = newValue.top;
      position.left = newValue.left;
      position.width = newValue.width;
      position.height = newValue.height;
      position.sjly = newValue.sjly;

      // console.log("当前的值", position);
    });
    return {
      searchValue,
      position,
      // isImg1Show,
      // isImg2Show,
      // isImg3Show,
      // isImg4Show,
    };
  },
};
</script>
<style lang="less" scoped>
.search-content {
  width: calc(100% - 366px);
  height: 600px;
  margin-right: 16px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 0 20px 20px;

  &-header {
    // height: 60px;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    padding: 12px 0;
    display: flex;
    align-items: center;
    border-bottom: #e3e6eb 1px solid;

    .header-img {
      margin-right: 10px;
    }

    .header-sub {
      font-weight: 500;
      color: #97a3b7;
    }
  }

  &-body {
    //padding: 20px;
    max-height: calc(100% - 53px);
    max-width: 100%;

    overflow-x: scroll;
    overflow-y: scroll;

    //overflow: scroll;
    // max-height: 540px;

    &-iframe {
      // width: 540px;
      // height: 440px;   这里显示要展示的大小
      // max-width: 100%;
      // max-height: 100%;
      // overflow-x: scroll;
      // overflow-y: scroll;
      overflow: hidden;
    }

    // img {
    //   width: 100%;
    // }
  }
}
</style>
