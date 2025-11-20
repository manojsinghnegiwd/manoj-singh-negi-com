export interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  link: string;
  date: string;
  featured_media?: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export async function getWordPressPosts(
  blogUrl: string,
  count: number = 5
): Promise<WordPressPost[]> {
  const url = `${blogUrl}/wp-json/wp/v2/posts?per_page=${count}`;
  
  try {
    console.log(`[WordPress] Fetching posts from: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 Portfolio Website',
      },
      // Force fetch at build time and cache the result
      next: { revalidate: false }, // Static generation - never revalidate
    });

    if (!response.ok) {
      console.error(`[WordPress] Failed to fetch: ${response.status} ${response.statusText}`);
      console.error(`[WordPress] URL: ${url}`);
      
      // Log response body for debugging
      const text = await response.text().catch(() => 'Could not read response');
      console.error('[WordPress] Response:', text.substring(0, 300));
      return [];
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.error('[WordPress] Response is not an array:', typeof data);
      return [];
    }
    
    console.log(`[WordPress] Successfully fetched ${data.length} posts`);
    return data;
  } catch (error) {
    console.error('[WordPress] Error fetching posts:', error);
    console.error(`[WordPress] Attempted URL: ${url}`);
    return [];
  }
}

export function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\[&hellip;\]/g, '...');
}

export function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

export function decodeHtmlEntitiesServer(text: string): string {
  // Server-side HTML entity decoding
  return text
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8216;/g, "'");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

