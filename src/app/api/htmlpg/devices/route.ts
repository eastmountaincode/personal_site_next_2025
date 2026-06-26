import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type D1Error = {
  code: number;
  message: string;
};

type D1Result<T> = {
  results?: T[];
};

type D1Response<T> = {
  success: boolean;
  result?: D1Result<T>[];
  errors?: D1Error[];
};

type HtmlpgDevice = {
  id: string;
  name: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
};

const DEVICE_MAP_QUERY = `
  SELECT id, name, city, address, map_lat AS lat, map_lng AS lng
  FROM devices
  WHERE address IS NOT NULL
    AND trim(address) != ''
    AND map_lat IS NOT NULL
    AND map_lng IS NOT NULL
  ORDER BY id
`;

export async function GET() {
  try {
    const devices = await queryD1<HtmlpgDevice>(DEVICE_MAP_QUERY);
    return NextResponse.json(
      { devices },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("[HTMLPG] Device map query failed.", error);
    return NextResponse.json(
      { error: "Could not load device locations." },
      { status: 500 }
    );
  }
}

async function queryD1<T>(sql: string): Promise<T[]> {
  const { accountId, apiToken, databaseId } = getD1Config();
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`D1 query failed with HTTP ${response.status}`);
  }

  const data = (await response.json()) as D1Response<T>;
  if (!data.success) {
    const message = data.errors?.map((error) => error.message).join(", ");
    throw new Error(message || "D1 query failed");
  }

  return data.result?.[0]?.results ?? [];
}

function getD1Config() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_D1_API_TOKEN;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;

  if (!accountId || !apiToken || !databaseId) {
    throw new Error("Missing Cloudflare D1 environment variables");
  }

  return { accountId, apiToken, databaseId };
}
