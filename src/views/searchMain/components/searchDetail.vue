<template>
  <div class="search-detail">
    <div class="search-detail-header">相关指标</div>
    <div
      v-if="
        tagDetail &&
        tagDetail.associatedLabels &&
        (tagDetail.associatedLabels.length > 0 ||
          tagDetail.relatedIndicators.length > 0)
      "
    >
      <div class="search-detail-tags">
        <div class="search-detail-tags-header">
          <div class="search-detail-tags-header-label"></div>
          <div class="search-detail-tags-header-title">关联标签</div>
        </div>
        <div class="search-detail-tags-associatedLabels">
          <div
            class="search-detail-tags-associatedLabel"
            v-for="(label, index) in tagDetail.associatedLabels"
            :key="index"
            @click="handleTagClick(label)"
            :style="{
              'background-color': label.isChoose ? '#e6f4ff' : '#e3e6eb',
              color: label.isChoose ? '#1776ff' : 'black',
            }"
          >
            <span> {{ label.label }} </span>
          </div>
        </div>
      </div>
      <div class="search-detail-content">
        <div class="search-detail-tags-header">
          <div class="search-detail-tags-header-label"></div>
          <div class="search-detail-tags-header-title">相关指标</div>
        </div>
        <div class="search-detail-tags-relatedIndicators">
          <div
            class="search-detail-tags-relatedIndicator"
            v-for="indicator in tagDetail.relatedIndicators"
            :key="indicator.id"
            @click="changeImg(indicator.label)"
          >
            <span> {{ indicator.label }} </span>
          </div>
        </div>
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
import axios from "axios";

export default {
  name: "SearchDetail",
  props: {
    tagDetail: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["changeRelatedIndicators", "getImg"],
  setup(props, { emit }) {
    const handleTagClick = async (label) => {
      // 切换标签的选中状态
      label.isChoose = !label.isChoose;

      // 收集所有已选中的标签
      const selectedTags = props.tagDetail.associatedLabels
        .filter((tag) => tag.isChoose)
        .map((tag) => tag.label);

      const selectedTagsString = selectedTags.join(",");

      // 创建一个 FormData 对象
      const formData = new FormData();

      // 将标签字符串添加到 FormData 中
      formData.append("tags", selectedTagsString);

      // 发送网络请求
      try {
        // const response = await axios.post(
        //   "http://192.168.1.190:8080/zhangjiang/getRelativeIndexs",
        //   formData
        // );
        const response = await axios.post(
          "http://172.18.192.66:8500/zhangjiang/getRelativeIndexs",
          formData
        );
        const responseData = response.data.data;

        // 将字符串数组映射为带有 id 和 label 的对象数组
        const mappedData = responseData.map((label, index) => ({
          id: `${index + 1}`,
          label,
        }));

        // 更新tagDetail.relatedIndicators
        emit("changeRelatedIndicators", mappedData);
      } catch (error) {
        console.error("发送请求时出错:", error);
      }
    };

    const changeImg = (label) => {
      emit("getImg", label);
    };

    return {
      handleTagClick,
      changeImg,
    };
  },
};
</script>
<style lang="less" scoped>
.empty-box {
  width: 100%;
  height: calc(100% - 53px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  color: #97a3b7;
}

.empty-img {
  width: 200px;
  height: 200px;
}

.search-detail {
  width: 350px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 0 20px;
  height: 600px;
}

.search-detail-header {
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-bottom: #e3e6eb 1px solid;
  padding: 12px 0;
}

.search-detail-tags {
  padding: 20px 0 10px 0;
}

.search-detail-tags-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.search-detail-tags-header-label {
  background-color: #1776ff;
  width: 3px;
  height: 15px;
}

.search-detail-tags-header-title {
  color: #1c222b;
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
}

.search-detail-tags-associatedLabels {
  display: flex;
  flex-wrap: wrap; /* 允许自动换行 */
}

.search-detail-tags-associatedLabel {
  background-color: #e6f4ff;
  border-radius: 8px;
  color: #1776ff;
  display: inline-block; /* 使用 inline-block，允许宽度根据内容自动调整 */
  white-space: nowrap;
  padding: 2px 12px;
  margin-right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%; /* 设置最大宽度为父容器的100% */
  margin-bottom: 10px;
  cursor: pointer;
}

.search-detail-tags-relatedIndicators {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 47px 10px;
  overflow: auto;
  cursor: pointer;
}

.search-detail-tags-relatedIndicator {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #3c485c;
  margin-bottom: 10px;
}
</style>
