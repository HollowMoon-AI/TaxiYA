import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

import crypto from 'crypto';

export async function GET(request: any) {
  try {
  const { searchParams } = new URL(request.url);

  const searchText = searchParams.get("q");

  // Check if MAPBOX_ACCESS_TOKEN is defined
  if (!process.env.MAPBOX_ACCESS_TOKEN) {
    
    // Handle the case where the token is undefined (throw an error or handle it accordingly)
    throw new Error("MAPBOX_ACCESS_TOKEN is not defined");
  }

  // Generate a UUID for session token
  const sessionToken = crypto.randomUUID();

  if (!searchText) {
    // Handle empty search text edge case
    return NextResponse.json({ searchResult: [] });
  }

  const fetchUrl = new URL(BASE_URL);
  fetchUrl.searchParams.set('q', searchText);
  fetchUrl.searchParams.set('language', 'en');
  fetchUrl.searchParams.set('limit', '6');
  fetchUrl.searchParams.set('country', 'US');
  fetchUrl.searchParams.set('access_token', process.env.MAPBOX_ACCESS_TOKEN);
  fetchUrl.searchParams.set('session_token', sessionToken);

  const res = await fetch(fetchUrl.toString(),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  

    if (!res.ok) {
      // Handle API errors
      const error = await res.text();
      console.error('Mapbox API Error:', error);
      return NextResponse.json({ error });
    }

    const searchResult = await res.json();
    console.log('Search Result:', searchResult);
    return NextResponse.json({ searchResult });
  } catch (error) {
    // Handle network errors
    console.error('Network Error:', error);
    return NextResponse.json({ error: error.message });
  }
}
