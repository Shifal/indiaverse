const NEWSAPI_BASE = 'https://newsapi.org/v2/top-headlines';
const NEWSAPI_KEY = process.env.REACT_APP_NEWSAPI_KEY;

export async function fetchNewsForState(stateName) {
  const q = stateName ? `&q=${encodeURIComponent(stateName)}` : '';
  const url = `${NEWSAPI_BASE}?country=in${q}&apiKey=${NEWSAPI_KEY}&pageSize=10`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('News fetch failed');
  const data = await res.json();
  return data.articles;
}
