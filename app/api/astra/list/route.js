export async function GET() {
  try {
    const response = await fetch(
      'https://8b0eab33-b140-4845-8398-239a368ffc12-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/jack123/img/rows?fields=id,createtime,size&page-size=-1',
      {
        headers: {
          'accept': 'application/json',
          'X-Cassandra-Token': 'AstraCS:cRxDUhfxzPmZJqRalWCjASxh:ff40c8ef1fdfe2691b03e69e0674a4f576d118d96b2961e81bef61b8cb43732f',
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch image list')
    }

    const data = await response.json()
    // Sort by createtime descending (newest first)
    const sortedData = {
      ...data,
      data: (data.data || []).sort((a, b) => 
        new Date(b.createtime) - new Date(a.createtime)
      )
    }

    return new Response(JSON.stringify(sortedData), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
