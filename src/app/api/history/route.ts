import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const HISTORY_FILE = path.join(DATA_DIR, "chat_history.json");

/**
 * 데이터 디렉토리가 존재하는지 확인하고 없으면 생성합니다.
 */
async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

/**
 * 서버에 저장된 채팅 히스토리를 불러옵니다.
 */
export async function GET() {
    await ensureDataDir();
    try {
        const data = await fs.readFile(HISTORY_FILE, "utf-8");
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        // 파일이 없거나 읽기 오류 시 기본값 반환
        return NextResponse.json({ messages: [], history: [], insights: [] });
    }
}

/**
 * 채팅 히스토리를 서버에 저장합니다.
 */
export async function POST(req: NextRequest) {
    await ensureDataDir();
    try {
        const body = await req.json();
        // body는 { messages, history, insights } 형태를 기대합니다.
        await fs.writeFile(HISTORY_FILE, JSON.stringify(body, null, 2), "utf-8");
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("History Save Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
