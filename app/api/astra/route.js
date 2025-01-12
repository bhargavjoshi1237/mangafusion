export async function POST(request) {
    const { id, imgdata, createtime, size, total } = await request.json()
  
    try {
      console.log('Attempting to upload with ID:', id)
      console.log('Image size:', size, 'KB')
  
      const response = await fetch(
        'https://8b0eab33-b140-4845-8398-239a368ffc12-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/jack123/img',
        {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'X-Cassandra-Token': 'AstraCS:cRxDUhfxzPmZJqRalWCjASxh:ff40c8ef1fdfe2691b03e69e0674a4f576d118d96b2961e81bef61b8cb43732f',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id.toString(),
            imgdata,
            createtime,
            size: size.toString(),
            total
          })
        }
      )
  
      const responseData = await response.json()
      
      if (!response.ok) {
        console.error('Astra DB Error:', responseData)
        throw new Error(`Failed to upload to Astra DB: ${responseData.message || 'Unknown error'}`)
      }
  
      return new Response(JSON.stringify({ success: true, data: responseData }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Upload error:', error)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error.message,
          details: error.toString()
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
  }
  
  export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
  
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  
    try {
      const response = await fetch(
        `https://8b0eab33-b140-4845-8398-239a368ffc12-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/jack123/img/${id}?fields=imgdata&page-size=10&count=DESC`,
        {
          method: 'GET',
          headers: {
            'accept': 'application/json',
           'X-Cassandra-Token': 
          'ID HEAR'
        }
        }
      )
  
      if (!response.ok) {
        throw new Error('Failed to fetch from Astra DB')
      }
  
      const data = await response.json()
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
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
