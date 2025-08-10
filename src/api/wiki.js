import axios from "axios";

export const searchWikiTitles = async (q) => {
  const res = await axios.get(
    "https://ko.wikipedia.org/w/rest.php/v1/search/title",
    { params: { q, limit: 10 } }
  );
  // res.data.pages 형태로 반환됨
  return res.data.pages;
};
