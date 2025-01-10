export const runtime = 'edge';

async function getValue() {
  const startTime = performance.now();
  
  const response = await fetch('https://8b0eab33-b140-4845-8398-239a368ffc12-asia-south1.apps.astra.datastax.com/api/rest/v2/schemas/keyspaces/jack123/tables/images', {
    headers: {
      'accept': 'application/json',
      'X-Cassandra-Token': 'eyJraWQiOiJVNkdHY2JlOHo5ZFdqSEp6ZjBsZ1lSVHpxbExSWWN6QmswV3ZQN0QwRm53IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlJJU3g4OUZKM3Q0MVBJX2s4VTZzRGZsd0RsUmRNclRmMVJ6bUdzWUl2alkub2FyMmFsNXdiN2k1WG9GTlc2OTciLCJpc3MiOiJodHRwczovL2lkZW50aXR5LmRhdGFzdGF4LmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE3MzY0MjgwMTgsImV4cCI6MTczNjQzMTYxOCwiY2lkIjoiMG9hNHAzZXBubjlFZm14WGE2OTciLCJ1aWQiOiIwMHVuN3hmbzhxMEZ4MEFhdTY5NyIsInNjcCI6WyJvZmZsaW5lX2FjY2VzcyIsIm9wZW5pZCIsImVtYWlsIiwicHJvZmlsZSJdLCJhdXRoX3RpbWUiOjE3MzY0MjQ0MTUsInN1YiI6Ijk0ZjI5ODk5LWFjYjEtNGJiNi1iZWI3LTYxYWZjOTdhZDFjNiIsImVtYWlsIjoiYmhhcmdhdmpvc2hpMTIzN0BnbWFpbC5jb20ifQ.YCi4-FkxqG8kIS0WSfuBuun3EoTFrEcjZK9Jd7GMnm7gzhtA0CSXQOeS1KeMAMRl1d-CM7Mu2Zj75fQ5n_FjZqtfANlw7u2Bn0Y1rGPdfndOCqyfoHVMhkgI4HbSN9KIcCWoV7N1jJk06EjrxuYMQIvGlrl_cxGfuGuWqknvLDed2AGcDg9pqpmsnYfOyMKLdErurJvE34fdZwVU9Nl4K6YVgR5yKjptjz_TnfxVYk_57Z_A6DFHZFqFABMOiRP4hFqwytnGxQfiTdURc1_gOoiY6ZWedpna6vaUIp4tSoIQCgBt3M_QcfaiT91LOfPz33VWuije7yLlKDSLplDGrA'
    }
  });
  
  const data = await response.json();
  const endTime = performance.now();
  const responseTime = Math.round(endTime - startTime);

  return { data, responseTime };
}

export default async function Page() {
  const { responseTime } = await getValue();
  
  return (
    <div suppressHydrationWarning={true}>
      <p suppressHydrationWarning={true}>Response Time: {responseTime}ms</p>
    </div>
  );
}

