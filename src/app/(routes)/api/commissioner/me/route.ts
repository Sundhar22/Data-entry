import prisma from "@/lib/prisma";
import { Commissioner } from "@/types/commissioner";
import { UpdateCommissionerApiSchema } from "@/schemas/commissioner";
import { validateRequest } from "@/lib/validation";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  
  try {
    const temp_id = 'cmd5jn3800000cpye9csrtue6';
    console.log('Looking for commissioner with ID:', temp_id);
    
    const commissioner = await prisma.commissioner.findUnique({
      where: {
        id: temp_id
      },
      select: { id: true, name: true, email: true, phone: true, commission_rate: true, location: true, created_at: true, updated_at: true }
    })
    
    console.log('Commissioner found:', commissioner);
    
    if (!commissioner) {
      console.log('Commissioner not found');
      return NextResponse.json({ error: "Commissioner not found" }, { status: 404 });
    }
    
    return NextResponse.json(commissioner, { status: 200 });
  } catch (error) {
    console.error('Error in /api/commissioner/me:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const temp_id = 'cmd5jn3800000cpye9csrtue6';

    // Validate the request body using Zod
    const validator = validateRequest(UpdateCommissionerApiSchema);
    const validation = await validator(req);
    
    if (!validation.success) {
      return validation.response;
    }

    const validatedData = validation.data;

    const existingCommissioner = await prisma.commissioner.findUnique({
      where: { id: temp_id }
    });

    if (!existingCommissioner) {
      console.log('Commissioner not found');
      return NextResponse.json({ error: "Commissioner not found" }, { status: 404 });
    }
    
    const updatedCommissioner = await prisma.commissioner.update({
      where: { id: temp_id },
      data: {
        name: validatedData.name || existingCommissioner.name,
        email: validatedData.email || existingCommissioner.email,
        phone: validatedData.phone || existingCommissioner.phone,
        location: validatedData.location || existingCommissioner.location,
        commission_rate: validatedData.commission_rate !== undefined ? validatedData.commission_rate : existingCommissioner.commission_rate,
      }
    }); 
    
    return NextResponse.json(updatedCommissioner, { status: 200 });
  } catch (error) {
    console.error('Error in /api/commissioner/me:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
