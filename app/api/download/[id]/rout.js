import { createClient } from '@libsql/client';
import { NextResponse } from 'next/server';

const client = createClient({
  url: 'libsql://1-bhargavjoshi1237.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzYxMzg1MjcsImlkIjoiZDQ4ZmU1YjktYmRhMi00NzVjLTk1YzgtZmE2ZWQ1ZjJiMDhhIn0.wz7YppPDRU3qSNHAwiz_X0imUuUWiBUNlIWe4ks_l4Y-ApnYBp-CwzAAxlOnoit4arPo9vXGE7N7Zg9lNWhLAA'
});

export async function GET(request, { params }) {
  try {
    const id = params.id;
    const result = await client.execute({
      sql: 'SELECT image_data, content_type FROM images WHERE id = ?',
      args: [id]
    });

    if (!result.rows.length) {
      return new NextResponse('File not found', { status: 404 });
    }

    const base64Data = result.rows[0].image_data.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const contentType = result.rows[0].content_type || 'image/jpeg';
    const extension = contentType.startsWith('video/') ? '.mp4' : '.jpg';

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="media-${id}${extension}"`,
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return new NextResponse('Error processing download', { status: 500 });
  }
}
