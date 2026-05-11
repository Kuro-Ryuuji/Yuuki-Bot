import axios from 'axios'

export async function pinterestSearch(query) {
  try {
    const { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=/search/pins/?q=${encodeURIComponent(query)}&data={"options":{"isPrefetch":false,"query":"${encodeURIComponent(query)}","scope":"pins","no_fetch_context_on_resource":false},"context":{}}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const results = data.resource_response?.data?.results || []
    return results.map(item => item.images?.orig?.url).filter(Boolean)
  } catch {
    return []
  }
}
