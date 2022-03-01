interface UrlShortData {
  error: number;
  short: string;
}

interface RebrandlyData {
  shortUrl: string;
}

export async function shortener(url = ''): Promise<string> {
  const json = JSON.stringify({ url });

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'Token Fpgz5Q8RNdwo',
  });

  // headers.append('Content-Type', 'application/json');
  // headers.append('Authorization', 'Token Fpgz5Q8RNdwo');
  // headers.append('Access-Control-Allow-Headers', '*');

  try {
    const response = await fetch('https://url.gratis/api/url/add', {
      method: 'POST',
      headers,
      body: json,
      // mode: 'cors',
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

export async function shortenerRebrandly(url = ''): Promise<string> {
  const linkRequest = {
    destination: url,
  };

  const headers = new Headers({
    'Content-Type': 'application/json',
    apikey: '8b666cb2f64548cbab03e08ca795898c',
  });

  try {
    const response = await fetch('https://api.rebrandly.com/v1/links', {
      method: 'post',
      body: JSON.stringify(linkRequest),
      headers,
    });

    if (!response.ok) {
      return url;
    }

    const result: RebrandlyData = await response.json();

    return `https://${result.shortUrl}`;
  } catch (error) {
    return url;
  }
}
