import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const fileContent = JSON.stringify(data, null, 2);

  return new NextResponse(fileContent, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="users.json"',
    },
  });
}
