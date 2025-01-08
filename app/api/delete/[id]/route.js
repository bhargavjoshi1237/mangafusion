import { createClient } from '@libsql/client';
import { NextResponse } from 'next/server';

const client = createClient({
  url: 'libsql://1-bhargavjoshi1237.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzYxMzg1MjcsImlkIjoiZDQ4ZmU1YjktYmRhMi00NzVjLTk1YzgtZmE2ZWQ1ZjJiMDhhIn0.wz7YppPDRU3qSNHAwiz_X0imUuUWiBUNlIWe4ks_l4Y-ApnYBp-CwzAAxlOnoit4arPo9vXGE7N7Zg9lNWhLAA'
});

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    await client.execute({
      sql: 'DELETE FROM images WHERE id = ?',
      args: [id]
    });

    return new NextResponse('Deleted successfully', { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return new NextResponse('Error deleting file', { status: 500 });
  }
}
