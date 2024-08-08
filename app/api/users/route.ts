import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    const data = request.url
    const datas = request.nextUrl.searchParams
    return NextResponse.json(datas)
    
}