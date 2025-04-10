import { getButterflyData } from "@/app/lib/butterfly"
import { NextResponse } from "next/server"

export async function GET(req){
    try{
        const butterfly_data = await getButterflyData()
        return NextResponse.json({message:"success",data:butterfly_data},{status:200})
    }
    catch(e){
        return NextResponse.json({message:e},{status:500})
    }
}
