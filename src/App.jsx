import { useEffect, useRef, useState } from "react";
import { searchWikiTitles } from "./api/wike";
import "./App.css";



const App = () => {


  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = async () => {
    const keyword = q.trim();
    if (!keyword) return;
    try {
      setLoading(true);
      setErr("");
      const pages = await searchWikiTitles(keyword);
      setItems(pages);
    } catch (e) {
      console.error(e);
      setErr("검색 중 오류가 발생했습니다.");
      setItems([]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="app">
      <h1>🔎 위키백과(ko) 검색</h1>

      <div className="search">
        <input
          ref={inputRef}
          placeholder="검색어를 입력하세요 (예: 서울, 한글, 리액트)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "검색 중..." : "검색"}
        </button>
      </div>

      {err && <p className="error">{err}</p>}

      <ul className="list">
        {items.map((p) => (
          <li className="item" key={p.id}>
            <div>
              <strong>{p.title}</strong>
              <div style={{ color: "#555", fontSize: 14 }}>
                {p.description || "요약 없음"}
              </div>
              <a
                href={`https://ko.wikipedia.org/wiki/${encodeURIComponent(p.title)}`}
                target="_blank"
                rel="noreferrer"
              >
                위키에서 보기
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
