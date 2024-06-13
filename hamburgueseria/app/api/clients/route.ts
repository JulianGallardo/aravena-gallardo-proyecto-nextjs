import { ClientService } from "@/prisma/services/clientService";
import { NextRequest, NextResponse } from "next/server";

const clientService = new ClientService();

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const clientId = searchParams.get("clientId");
    if (clientId) {
      {
        const clients = await clientService.getClientById(
          Number(clientId)
        );
        return NextResponse.json({
          status: 200,
          body: clients,
        });
      }
    } else {
      const clients = await clientService.getAllClients();
      return NextResponse.json({
        status: 200,
        body: clients,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: error.message,
    });
  }
}
