import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: "Hello from API!",
    status: "success",
    timestamp: new Date().toISOString(),
    data: {
      users: [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" }
      ]
    }
  });
}
