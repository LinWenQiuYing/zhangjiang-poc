<template>
  <div class="search-main">
    <div class="search-main-header">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div class="search-main-body">
      {{ test }}
      <SearchInput @tagsToIndexvue="handleSearchTags" :value="searchValue" />
      <SearchTags
        :tags="searchTags"
        @checkTagDetail="checkTagDetail"
        @getImg="getImg"
        title="指标项"
      />
      <SearchContent :value="checkTag" :iframeParams="iframeParams" />
      <SearchDetail
        :tagDetail="tagDetail"
        @changeRelatedIndicators="handleChangeRelatedIndicators"
        @getImg="getImg"
      />
    </div>
  </div>
</template>
<script>
import { getIframe } from "@/shared/api/tags";
import axios from "axios";
import { computed, onMounted, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import SearchContent from "./components/searchContent";
import SearchDetail from "./components/searchDetail";
import SearchInput from "./components/searchInput";
import SearchTags from "./components/searchTags";

export default {
  name: "SearchMain",
  components: {
    SearchContent,
    SearchDetail,
    SearchInput,
    SearchTags,
  },
  setup() {
    //点击tag,展示的图片变更
    const iframeParams = reactive({
      iframeUrl: "",
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      sjly: "",
    });

    const searchTags = ref([]);
    const store = useStore();
    const searchValue = computed(() => store.state.label);
    const checkTag = ref(null);

    const params = reactive({
      tagDetail: {
        associatedLabels: [],
        relatedIndicators: [],
      },
    });
    const test = ref(null);
    const getTags = async () => {
      const res = {};
      if (res.code === 200) {
        params.tags = res.data.forEach((item) => {
          item.checked = false;
        });
      }
    };

    //根据点击的tag获取图片
    const getImg = async (name) => {
      const res = await getIframe(name);
      if (res.message === "成功") {
        iframeParams.iframeUrl = res.data.url;
        iframeParams.top = -res.data.y;
        iframeParams.left = -res.data.x;
        iframeParams.width = res.data.k;
        iframeParams.height = res.data.g;
        iframeParams.sjly = res.data.sjly;
      }
    };

    const checkTagDetail = async (indexName) => {
      //store.commit("setLabel", indexName);
      // 在这里触发网络请求到指定URL
      checkTag.value = indexName;
      // console.log("checkTag", checkTag.value);
      //const apiUrl = `http://192.168.1.190:8080/zhangjiang/getRelativeInfo`;
      const apiUrl = `http://172.18.192.66:8500/zhangjiang/getRelativeInfo`;
      try {
        // 使用axios或其他HTTP库发送网络请求
        const response = await axios.get(apiUrl, { params: { indexName } });

        // 处理响应数据
        const responseData = response.data;

        // 映射到relativeAllData
        params.tagDetail.associatedLabels = (
          responseData.data.relativeTags || []
        ).map((label) => {
          return { label: label, isChoose: true };
        });
        params.tagDetail.relatedIndicators = (
          responseData.data.relativeIndexs || []
        ).map((label) => ({ label }));
        // 在这里处理获取的相关信息，可以更新组件状态或触发其他逻辑
      } catch (error) {
        // 处理请求错误
        console.error("Error fetching relative info:", error);
      }
      // await getImg(indexName);
      // console.log("变化", iframeParams);
    };

    //搜索框点击搜索的时候，清除上一次的iframe
    const initIframe = () => {
      iframeParams.iframeUrl = "";
      iframeParams.top = 0;
      iframeParams.left = 0;
      iframeParams.width = 0;
      iframeParams.height = 0;
      iframeParams.sjly = "";
    };

    const handleSearchTags = (tags, value) => {
      initIframe();
      store.commit("setLabel", value);
      // 在这里处理从SearchInput传递过来的tags
      searchTags.value = tags;
      if (tags.length && tags[0].name === value) {
        checkTagDetail(value);
      }
    };

    const handleChangeRelatedIndicators = (relatedIndicators) => {
      params.tagDetail.relatedIndicators = relatedIndicators;
    };

    onMounted(() => {
      checkTag.value = searchValue.value;
    });

    return {
      iframeParams,
      ...toRefs(params),
      test,
      checkTag,
      searchValue,
      searchTags,
      getTags,
      checkTagDetail,
      handleSearchTags,
      handleChangeRelatedIndicators,
      getImg,
    };
  },
};
</script>
<style lang="less" scoped>
.search-main {
  width: 100%;
  min-height: 100%;
  min-width: 1440px;
  // min-width: 1600px;
  padding-bottom: 20px;

  &-body {
    padding: 0 180px;
    // padding: 0 260px;
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 56px);
    padding-top: 56px;
  }
}
</style>
