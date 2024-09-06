<template>
  <div class="search-tags">
    <div class="search-tags-header">
      <span>{{ title }}</span>
      <!-- <div
        style="display: flex; align-items: center"
        v-show="title !== '推荐指标项'"
      >
        <img src="@/assets/Frame.png" alt="" class="search-icon" />
        <span
          style="
            margin-left: 8px;
            color: #97a3b7;
            font-weight: 500;
            font-size: 16px;
          "
        >
          全部指标
        </span>
      </div> -->
    </div>
    <div class="search-tags-content" v-if="tags.length > 0">
      <div
        class="search-tags-tag"
        v-for="item in tags"
        :key="item.id"
        @click="handleCheckDetail(item)"
      >
        <span class="search-tags-tag_label">{{ item.label }}</span>
        <p
          :class="[
            'search-tags-tag_main',
            path === '/search' ? 'search-tags-tag_search' : '',
          ]"
        >
          {{ item.name }}
          <!-- 暂无内容，请先选择指标项暂无内容，请先选择指标项暂无内容，请先选择指标项 -->
        </p>
      </div>
    </div>
    <div v-else class="empty-box">
      <!-- 如果 tags 数组为空，显示一张图片和一行文字 -->
      <img src="@/assets/empty.png" alt="Empty Image" class="empty-img" />
      <p>暂无内容，请先选择指标项</p>
    </div>
  </div>
</template>
<script>
import { nextTick, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "SearchTags",
  props: {
    title: {
      type: String,
      default: "",
    },
    tags: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["checkTagDetail", "getImg"],
  setup(props, { emit }) {
    const path = ref("");
    const router = useRouter();
    path.value = router.currentRoute._value.path;
    const store = useStore();
    //console.log("路由", router.currentRoute._value.path);

    const handleCheckDetail = (item) => {
      emit("checkTagDetail", item.name);
      emit("getImg", item.name);
    };

    onMounted(() => {
      //console.log("2222222222", store.state.label);
      nextTick(() => {
        setTimeout(() => {
          emit("getImg", store.state.label);
        }, 800);
      });
    });

    return {
      handleCheckDetail,
      path,
    };
  },
};
</script>
<style lang="less" scoped>
.empty-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  color: #97a3b7;
}

.empty-img {
  width: 120px;
  height: 120px;
}

.search-tags {
  width: 100%;
  //height: 226px;
  height: 300px;
  padding: 0 20px;
  margin-bottom: 16px;
  background-color: #ffffff;
  border-radius: 10px;
}

.search-tags-header {
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: #e3e6eb 1px solid;
}

.search-tags-content {
  width: 100%;
  max-height: calc(100% - 64px); /* 调整内容区域的最大高度，56px 是头部高度 */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: auto;
}

.search-tags-tag {
  // height: 43px;
  height: 80px;
  width: 16%;
  display: flex;
  margin: 1.5% 2% 1.5% 2%;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
}

.search-tags-tag_label {
  background-color: #e6f4ff;
  color: #1776ff;
  font-size: 24px;
  font-weight: 600;
  height: 43px;
  width: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-tags-tag_main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: #1c222b;
  font-weight: 1000;
  font-size: 20px;
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-tags-tag_main--tag {
  color: #5f7292;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-tags-tag_search {
  //line-height: 43px;
  width: 123px;
  white-space: normal;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  // display: inline-block;
  display: -webkit-box !important; /*  display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示  */
  -webkit-box-orient: vertical !important; /*  -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式  */
  -webkit-line-clamp: 3 !important; /*  -webkit-line-clamp用来限制在一个块元素显示的文本的行数 */
  overflow: hidden !important;
}
</style>
