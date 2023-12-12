import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);

  const searchText = searchParams.get("q");

  // Check if MAPBOX_ACCESS_TOKEN is defined
  if (!process.env.MAPBOX_ACCESS_TOKEN) {
    
    // Handle the case where the token is undefined (throw an error or handle it accordingly)
    throw new Error("MAPBOX_ACCESS_TOKEN is not defined");
  }

  const res = await fetch(
    `${BASE_URL}?q=${searchText}&language=en&limit=6&country=US&session_token=[GENERATED-UUID]`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  

  const searchResult = await res.json();
  console.log('Search Result:', searchResult);
  return NextResponse.json({ searchResult });
}
