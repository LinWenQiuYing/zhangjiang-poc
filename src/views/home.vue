<!-- Home.vue -->
<template>
  <div class="home">
    <div class="search-main-header">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <!-- 在这里放置你的首页内容 -->
    <SearchInput @tagsToIndexvue="handleSearchTags" type="home" />
    <SearchTags
      :tags="searchTags"
      @checkTagDetail="checkTagDetail"
      title="推荐指标项"
    />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import SearchInput from "../views/searchMain/components/searchInput.vue";
import SearchTags from "../views/searchMain/components/searchTags.vue";

export default {
  name: "Home",
  components: {
    SearchTags,
    SearchInput,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const searchTags = [
      {
        label: "总",
        name: "总资产",
      },
      {
        label: "总",
        name: "总负债",
      },
      {
        label: "营",
        name: "营业收入",
      },
      {
        label: "有",
        name: "有息负债",
      },
      {
        label: "归",
        name: "归属于上市公司股东净利润",
      },
      {
        label: "净",
        name: "净资产收益率",
      },
      {
        label: "自",
        name: "自持面积",
      },
      {
        label: "可",
        name: "可出租面积",
      },
    ];

    const checkTagDetail = async (indexName) => {
      try {
        router.push({ path: "/search" });
        store.commit("setLabel", indexName);
      } catch (error) {
        // 处理请求错误
        console.error("Error fetching relative info:", error);
      }
    };

    const handleSearchTags = (value) => {
      router.push({ path: "/search" });
      store.commit("setLabel", value);
    };

    return {
      searchTags,
      checkTagDetail,
      handleSearchTags,
    };
  },
};
</script>

<style lang="less">
/* 设置全屏背景图 */
.home {
  height: 100vh; /* 100% 视窗高度，实现全屏效果 */
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: black;

  .search-tags {
    width: 920px;
    height: 392px;
    border-radius: 16px;
  }
  .search-tags-tag {
    width: calc((100% - 20px) / 2);
    height: 67px !important;
    background-color: #f6f8fa;
    margin: 12px 20px 0 0 !important;
    border-radius: 8px;
    display: flex;
    align-items: center;

    &:nth-child(2n) {
      margin-right: 0 !important;
    }
  }

  .search-tags-tag_label {
    margin-left: 5%;
  }
}
</style>
