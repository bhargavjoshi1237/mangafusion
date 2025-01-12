'use client'
import { useState, useEffect } from 'react'

export default function ImageUpload() {
  const [uploadStatus, setUploadStatus] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [fetchedImage, setFetchedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchId, setSearchId] = useState('')
  const [fetchStatus, setFetchStatus] = useState(null)
  const [imageList, setImageList] = useState([])
  const [listLoading, setListLoading] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [storageInfo, setStorageInfo] = useState({
    used: 0,
    total: 80 * 1024 * 1024, // 80GB in KB
    percentage: 0
  })

  const generateId = () => {
    return Math.floor(Math.random() * 1000000).toString()
  }

  const resizeImage = (file) => {
    // Log the actual file size for debugging
    console.log('Original file size (bytes):', file.size);
    console.log('Original file size (KB):', file.size / 1024);
    console.log('Size threshold (KB):', 800);

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          // If file is smaller than 800KB, return original file without resizing
          if (file.size <= 800 * 1024) {
            console.log('Image is under 800KB, skipping resize');
            resolve({
              blob: file,
              originalSize: file.size,
              newSize: file.size
            });
            return;
          }

          console.log('Image is over 800KB, performing resize');
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          const scale = Math.min(800 * 1024 / file.size, 1);
          width *= Math.sqrt(scale);
          height *= Math.sqrt(scale);

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            console.log('Resized file size (KB):', blob.size / 1024);
            resolve({
              blob,
              originalSize: file.size,
              newSize: blob.size
            });
          }, 'image/jpeg', 0.8);
        };
      };
      
    });
    
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const { blob, originalSize, newSize } = await resizeImage(file);
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1];
        const id = generateId();
        const now = new Date().toISOString();
        const finalSize = blob === file ? file.size : newSize; // Use file.size if not resized
        
        const startTime = performance.now();
        
        try {
          const response = await fetch('/api/astra', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({
              id,
              imgdata: base64String,
              createtime: now,
              size: (finalSize / 1024).toFixed(2),
              total: '1'
            })
          });

          const endTime = performance.now();

          if (response.ok) {
            setUploadStatus({
              success: true,
              id: id,
              responseTime: (endTime - startTime).toFixed(2),
              originalSize: (originalSize / 1024).toFixed(2) + ' KB',
              newSize: (newSize / 1024).toFixed(2) + ' KB'
            });
            fetchImageList(); // Refresh list after successful upload
          } else {
            setUploadStatus({
              success: false,
              error: 'Upload failed'
            });
          }
        } catch (error) {
          setUploadStatus({
            success: false,
            error: error.message
          });
        }
        setLoading(false);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      setLoading(false);
      setUploadStatus({
        success: false,
        error: error.message
      });
    }
  };

  const handleFetchImage = async (id) => {
    const idToFetch = id || searchId
    if (!idToFetch) return
    setLoading(true)
    const startTime = performance.now()
    
    try {
      const response = await fetch(`/api/astra?id=${idToFetch}`, {
        method: 'GET'
      })
      
      const endTime = performance.now()
      const responseTime = (endTime - startTime).toFixed(2)
      
      if (response.ok) {
        const data = await response.json()
        if (data.data?.[0]?.imgdata) {
          setFetchedImage(`data:image/jpeg;base64,${data.data[0].imgdata}`)
          setFetchStatus({
            success: true,
            responseTime: responseTime
          })
        }
      } else {
        setFetchedImage(null)
        setFetchStatus({
          success: false,
          error: 'Failed to fetch image'
        })
      }
    } catch (error) {
      console.error('Failed to fetch image:', error)
      setFetchStatus({
        success: false,
        error: error.message
      })
    }
    setLoading(false)
  }

  const calculateStorageUsed = (images) => {
    const totalKB = images.reduce((acc, img) => acc + parseFloat(img.size || 0), 0);
    const percentageUsed = (totalKB / (80 * 1024 * 1024)) * 100;
    setStorageInfo({
      used: totalKB,
      total: 80 * 1024 * 1024,
      percentage: percentageUsed.toFixed(2)
    });
  };

  const fetchImageList = async () => {
    setListLoading(true)
    try {
      const response = await fetch('/api/astra/list', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store'
      })
      
      if (response.ok) {
        const data = await response.json()
        setImageList(data.data || [])
        calculateStorageUsed(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch image list:', error)
    }
    setListLoading(false)
  }

  const handleDownload = async (id) => {
    try {
      const response = await fetch(`/api/astra?id=${id}`)
      const data = await response.json()
      if (data.data?.[0]?.imgdata) {
        const link = document.createElement('a')
        link.href = `data:image/jpeg;base64,${data.data[0].imgdata}`
        link.download = `image-${id}.jpg`
        link.click()
      }
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    
    try {
      const response = await fetch(`/api/astra/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        fetchImageList() // Refresh list after deletion
      }
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  useEffect(() => {
    fetchImageList()
  }, [])

  const calculateEstDownloadTime = (sizeInKB) => {
    const timeInMs = parseFloat(sizeInKB) * 8;
    return timeInMs < 1000 ? `${timeInMs.toFixed(0)}ms` : `${(timeInMs/1000).toFixed(1)}s`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <br />
      {/* Storage Widget */}
      <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-md w-64">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Storage Used</span>
          <span className="text-sm text-gray-500">
            {(storageInfo.used / 1024).toFixed(2)}MB / 80GB
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1 text-right">
          {storageInfo.percentage}% used
        </div>
      </div>

      <br />
      {/* Progress bar at top */}
      {loading && (
        <div className="fixed top-0 left-0 w-full z-50 mt-4 ">
          <div className="h-1 bg-green-400 w-[80%] ml-auto mr-auto animate-[progress_2s_ease-in-out_infinite]"></div>
        </div>
      )}
      <br />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Image Upload & Retrieval</h1>
        
        {/* Upload Section */}
        <div className="mb-8 p-4 border rounded">
          <h2 className="text-xl mb-4">Upload New Image</h2>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 mb-4
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
          />

          {uploadStatus && (
            <div className={`mt-4 p-4 rounded ${uploadStatus.success ? 'bg-green-50' : 'bg-red-50'}`}>
              {uploadStatus.success ? (
                <div className='flex gap-3 relative overflow-hidden animate-[fillBackground_1s_ease-in-out] bg-gradient-to-r from-green-50 to-green-100 bg-[length:200%_100%]'>
                  <div className='flex items-center justify-center gap-2'>
                    <svg className='' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22 10V6a2 2 0 0 0-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2m-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46c0-1.48-.8-2.77-1.99-3.46L4 6h16zM11 15h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2z"/>
                    </svg>
                    <p className="">{uploadStatus.id}</p>
                  </div>
                  <div className='flex items-center justify-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M10.54 14.53L8.41 12.4l-1.06 1.06l3.18 3.18l6-6l-1.06-1.06zm6.797-12.72l4.607 3.845l-1.28 1.535l-4.61-3.843zm-10.674 0l1.282 1.536L3.337 7.19l-1.28-1.536zM12 4a9 9 0 1 0 .001 18.001A9 9 0 0 0 12 4m0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7"/>
                    </svg>
                    <p className="">{uploadStatus.responseTime}ms</p>
                  </div>
                  <p className=""></p>
                  {uploadStatus.originalSize !== uploadStatus.newSize && (
                    <p className="">{uploadStatus.originalSize} -- {uploadStatus.newSize}</p>
                  )}
                </div>
              ) : (
                <p className="text-red-700">Error: {uploadStatus.error}</p>
              )}
            </div>
          )}
        </div>

        {/* Image View Section */}
        <div className="mb-8 p-4 border rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl">Image Viewer</h2>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
            >
              {showSearch ? 'Hide Search' : 'Manual Search'}
            </button>
          </div>

          {showSearch && (
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter image ID"
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={() => handleFetchImage()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Fetch
              </button>
            </div>
          )}

          {fetchStatus && (
            <div className={`mt-2 p-2 rounded ${fetchStatus.success ? 'bg-green-50' : 'bg-red-50'}`}>
              {fetchStatus.success ? (
                <p className="text-green-700">Fetch time: {fetchStatus.responseTime}ms</p>
              ) : (
                <p className="text-red-700">Error: {fetchStatus.error}</p>
              )}
            </div>
          )}

          {fetchedImage && (
            <div className="mt-4 flex justify-center">
              <img 
                src={fetchedImage} 
                alt="Fetched" 
                className="max-w-full max-h-[500px] h-auto rounded shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Image List Table */}
        <div className="mt-8">
          <h2 className="text-xl mb-4">Image Library</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image ID
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size (KB)
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Download Time
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {imageList.map((image) => (
                  <tr key={image.id} className="hover:bg-gray-50 "> 
                    <td className="px-6 py-4 whitespace-nowrap ">
                      <div className="text-sm text-gray-900">{image.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(image.createtime).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{image.size} KB</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{calculateEstDownloadTime(image.size)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleFetchImage(image.id)}
                        className="text-blue-600 hover:text-blue-900 mx-2"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDownload(image.id)}
                        className="text-green-600 hover:text-green-900 mx-2"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="text-red-600 hover:text-red-900 mx-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
