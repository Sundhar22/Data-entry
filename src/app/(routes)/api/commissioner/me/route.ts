import prisma from "@/lib/prisma";
import { UpdateCommissionerApiSchema } from "@/schemas/commissioner";
import { validateRequest } from "@/lib/validation";
import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { AuthenticatedRequest } from "@/types/auth";

async function getCommissioner(req: AuthenticatedRequest): Promise<NextResponse> {
  try {
    const userId = req.user.id;
    
    console.log('Looking for commissioner with ID:', userId);
    
    const commissioner = await prisma.commissioner.findUnique({
      where: {
        id: userId
      },
      select: { 
        id: true, 
        name: true, 
        email: true, 
        phone: true, 
        commission_rate: true, 
        location: true, 
        created_at: true, 
        updated_at: true 
      }
    });
    
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

async function updateCommissioner(req: AuthenticatedRequest): Promise<NextResponse> {
  try {
    const userId = req.user.id;
    
    // Validate the request body using Zod
    const validator = validateRequest(UpdateCommissionerApiSchema);
    const validation = await validator(req);
    
    if (!validation.success) {
      return validation.response;
    }

    const validatedData = validation.data;

    const existingCommissioner = await prisma.commissioner.findUnique({
      where: { id: userId }
    });

    if (!existingCommissioner) {
      console.log('Commissioner not found');
      return NextResponse.json({ error: "Commissioner not found" }, { status: 404 });
    }
    
    const updatedCommissioner = await prisma.commissioner.update({
      where: { id: userId },
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

// Export the protected routes
export const GET = withAuth(getCommissioner);
export const PUT = withAuth(updateCommissioner);
