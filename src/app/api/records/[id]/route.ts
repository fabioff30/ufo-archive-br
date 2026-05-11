import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface RecordItem {
  id: string;
  title: string;
  agency: string;
  type: string;
  release_date: string;
  incident_date: string;
  incident_location: string;
  blurb: string;
  source_url: string;
  text: string;
}

let cachedData: RecordItem[] | null = null;

async function loadData(): Promise<RecordItem[]> {
  if (cachedData) return cachedData;
  const filePath = path.join(process.cwd(), "public", "search-index.json");
  const raw = await fs.readFile(filePath, "utf-8");
  cachedData = JSON.parse(raw);
  return cachedData!;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await loadData();
  const record = data.find((r) => r.id === id);

  if (!record) {
    return NextResponse.json({ error: "Registro não encontrado" }, { status: 404 });
  }

  return NextResponse.json(record);
}

export async function generateStaticParams() {
  const data = await loadData();
  return data.map((r) => ({ id: r.id }));
}
