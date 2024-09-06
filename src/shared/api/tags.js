import axiosInstance from "./index.js";

const Url = "/zhangjiang";

// 根据分类id获取文件列表详情
export async function getIframe(name) {
  const res = await axiosInstance.get(`${Url}/getTableInfo?indexName=${name}`);
  return res;
}
