import { getButterflyDataTemperature} from "@/app/lib/butterfly"
import { NextResponse } from "next/server"
import { refreshSettings } from "@/app/lib/butterfly";

// pull butterfly data from DB
export async function GET(req){
    const { searchParams } = new URL(req.url);
    const refresh = searchParams.get('refresh') === 'true';
    
    if (refresh) {
        // Force refresh the data
        refreshSettings.refresh=true
    }
    try{
        const butterfly_data = await getButterflyDataTemperature()
        return NextResponse.json({message:"success",data:butterfly_data},{status:200})
    }
    catch(e){
        return NextResponse.json({message:e},{status:500})
    }
}
