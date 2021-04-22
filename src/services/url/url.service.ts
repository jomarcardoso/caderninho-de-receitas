interface UrlShortData {
  error: number;
  short: string;
}

// eslint-disable-next-line import/prefer-default-export
export async function shortener(url = ''): Promise<string> {
  const json = JSON.stringify({ url });

  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', 'Token ZkK6gSuEoZNv');
  headers.append('Access-Control-Allow-Headers', '*');

  try {
    const response = await fetch('https://url.gratis/api/url/add', {
      method: 'POST',
      headers,
      body: json,
      mode: 'no-cors',
    });

    if (!response.ok) {
      return url;
    }

    const result: UrlShortData = await response.json();

    return result.short;
  } catch (error) {
    return url;
  }
}
