export async function DELETE(request, { params }) {
  const { id } = params
  const startTime = performance.now()

  try {
    const response = await fetch(
      `https://8b0eab33-b140-4845-8398-239a368ffc12-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/jack123/img/${id}`,
      {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'X-Cassandra-Token': 'AstraCS:cRxDUhfxzPmZJqRalWCjASxh:ff40c8ef1fdfe2691b03e69e0674a4f576d118d96b2961e81bef61b8cb43732f'
        }
      }
    )

    const endTime = performance.now()
    const responseTime = (endTime - startTime).toFixed(2)
    console.log(`Delete operation took ${responseTime}ms for ID: ${id}`)

    if (!response.ok) {
      throw new Error('Failed to delete image')
    }

    return new Response(JSON.stringify({ 
      success: true,
      responseTime: responseTime 
    }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const endTime = performance.now()
    console.error('Delete failed:', error, `(${(endTime - startTime).toFixed(2)}ms)`)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        responseTime: (endTime - startTime).toFixed(2)
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
