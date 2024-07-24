import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    const data = request.url
    const datas = request.nextUrl.searchParams
    console.log('data', data)
    console.log('data', datas)
    return NextResponse.json(datas)
    
}