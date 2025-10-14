
import type { Stream } from '@/types/stream';

export async function getInitialStreams(): Promise<Stream[]> {
  try {
    // This fetch needs to be adapted if running outside of a browser context
    // For server-side rendering in Next.js, use an absolute URL.
    const res = await fetch('http://localhost:3000/api/streams');
    if (!res.ok) {
      console.error('Failed to fetch initial streams');
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching streams:', error);
    return [];
  }
}
