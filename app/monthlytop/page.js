'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@libsql/client';

const client = createClient({
  url: 'libsql://1-bhargavjoshi1237.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzYxMzg1MjcsImlkIjoiZDQ4ZmU1YjktYmRhMi00NzVjLTk1YzgtZmE2ZWQ1ZjJiMDhhIn0.wz7YppPDRU3qSNHAwiz_X0imUuUWiBUNlIWe4ks_l4Y-ApnYBp-CwzAAxlOnoit4arPo9vXGE7N7Zg9lNWhLAA'
});

export default function ImageConverter() {
  const [imageId, setImageId] = useState('');
  const [retrievedImage, setRetrievedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadTime, setUploadTime] = useState(null);
  const [downloadTime, setDownloadTime] = useState(null);
  const [progress, setProgress] = useState(0);
  const [originalSize, setOriginalSize] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [mediaType, setMediaType] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const maxVideoSize = 50 * 1024 * 1024; // 50MB limit
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024;  // 5MB for images
  const MAX_VIDEO_SIZE = 2 * 1024 * 1024;  // 2MB for videos (SQLite limitation)

  useEffect(() => {
    const initDb = async () => {
      try {
        // First try to add the column to existing table
        await client.execute(`
          ALTER TABLE images 
          ADD COLUMN content_type TEXT DEFAULT 'image/jpeg'
        `).catch(() => {
          // If table doesn't exist, create it with all columns
          return client.execute(`
            CREATE TABLE IF NOT EXISTS images (
              id TEXT PRIMARY KEY,
              image_data TEXT,
              content_type TEXT DEFAULT 'image/jpeg',
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `);
        });
      } catch (error) {
        console.error('Database initialization error:', error);
      }
    };
    initDb();
    fetchImageList();
  }, []);

  const fetchImageList = async () => {
    try {
      const result = await client.execute(`
        SELECT id, 
               length(image_data) as size,
               content_type, 
               created_at,
               substr(image_data, 1, 100) as preview
        FROM images 
        ORDER BY ${sortField} ${sortDirection}
      `);
      
      const processedList = result.rows.map(row => ({
        ...row,
        size: Math.round((row.size * 3) / 4 / 1024), // Convert to KB
        estimatedTime: (row.size / (1750 * 1024)).toFixed(2), // Estimate based on 500KB/s
        downloadUrl: `/api/download/${row.id}`,
        isVideo: row.content_type?.startsWith('video/')
      }));
      
      setImageList(processedList);
    } catch (error) {
      console.error('Error fetching media list:', error);
    }
  };

  const handleSort = (field) => {
    setSortDirection(sortField === field && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortField(field);
    fetchImageList();
  };

  const handleImageClick = async (id) => {
    try {
      setIsLoading(true);
      setProgress(0);
      const startTime = performance.now();

      const result = await client.execute({
        sql: 'SELECT image_data FROM images WHERE id = ?',
        args: [id]
      });

      if (result.rows.length > 0) {
        setImageId(id);
        setRetrievedImage(result.rows[0].image_data);
        setProgress(100);
        const endTime = performance.now();
        const timeElapsed = ((endTime - startTime) / 1000).toFixed(2);
        setDownloadTime(timeElapsed);
      } else {
        alert('Image not found');
      }
    } catch (error) {
      console.error('Error retrieving image:', error);
      alert('Failed to retrieve image');
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Clear retrieved image if it's the one being deleted
        if (id === imageId) {
          setRetrievedImage('');
          setImageId('');
        }
        fetchImageList(); // Refresh the list
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingBar = () => (
    <div className="w-full">
      <div className="h-2 bg-gray-200 rounded">
        <div 
          className="h-full bg-blue-500 rounded transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      {uploadProgress > 0 && (
        <div className="h-2 mt-1 bg-gray-200 rounded">
          <div 
            className="h-full bg-green-500 rounded transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
          <p className="text-xs text-gray-600 mt-1">
            Processing video: {Math.round(uploadProgress)}%
          </p>
        </div>
      )}
    </div>
  );

  const compressImage = async (file, targetSizeKB = 300) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let quality = 0.7;
          let width = img.width;
          let height = img.height;

          // Resize if width is too large
          if (width > 1200) {
            const ratio = 1200 / width;
            width = 1200;
            height = height * ratio;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Binary search for optimal quality to reach target size
          const compress = (min, max) => {
            quality = (min + max) / 2;
            const compressed = canvas.toDataURL('image/jpeg', quality);
            const size = Math.round((compressed.length * 3) / 4) / 1024; // KB

            if (Math.abs(size - targetSizeKB) < 10 || max - min < 0.01) {
              resolve(compressed);
            } else if (size > targetSizeKB) {
              compress(min, quality);
            } else {
              compress(quality, max);
            }
          };

          compress(0.1, 1.0);
        };
      };
    });
  };

  const validateFile = (file) => {
    const isVideo = file.type.startsWith('video/');
    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    
    if (file.size > maxSize) {
      const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
      const limitInMb = (maxSize / (1024 * 1024)).toFixed(2);
      throw new Error(
        `File too large (${sizeInMb}MB). ` +
        `${isVideo ? 'Videos' : 'Images'} must be under ${limitInMb}MB. ` +
        `${isVideo ? 'Due to database limitations, please use external video hosting services for larger videos.' : ''}`
      );
    }
    return true;
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      validateFile(file);
      
      setIsLoading(true);
      setProgress(0);
      const startTime = performance.now();
      
      const origSizeKB = Math.round(file.size / 1024);
      setOriginalSize(origSizeKB);
      
      let base64String;
      const isVideo = file.type.startsWith('video/');
      setMediaType(isVideo ? 'video' : 'image');

      if (isVideo) {
        base64String = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      } else {
        base64String = origSizeKB > 500 
          ? await compressImage(file)
          : await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(file);
            });
      }

      setProgress(75);
      const compSize = Math.round((base64String.length * 3) / 4 / 1024);
      setCompressedSize(compSize);
      
      const id = Date.now().toString();
      await client.execute({
        sql: 'INSERT INTO images (id, image_data, content_type) VALUES (?, ?, ?)',
        args: [id, base64String, file.type]
      });
      
      setProgress(100);
      const endTime = performance.now();
      const timeElapsed = ((endTime - startTime) / 1000).toFixed(2);
      setUploadTime(timeElapsed);
      alert(`File stored with ID: ${id}`);
      fetchImageList();
    } catch (error) {
      console.error('Error storing file:', error);
      alert(error.message);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const retrieveImage = async () => {
    if (!imageId) return;
    
    try {
      setIsLoading(true);
      setProgress(0);
      const startTime = performance.now();

      const result = await client.execute({
        sql: 'SELECT image_data FROM images WHERE id = ?',
        args: [imageId]
      });

      if (result.rows.length > 0) {
        setProgress(50);
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay to ensure state update
        setRetrievedImage(result.rows[0].image_data);
        setProgress(100);
        const endTime = performance.now();
        const timeElapsed = ((endTime - startTime) / 1000).toFixed(2);
        setDownloadTime(timeElapsed);
      } else {
        setRetrievedImage('');
        alert('Image not found');
      }
    } catch (error) {
      console.error('Error retrieving image:', error);
      alert('Failed to retrieve image');
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return (
    <div className="p-4">
      {isLoading && <LoadingBar />}
      
      <div className="mb-4">
        <h2 className='mb-4'>Upload Media</h2>
        <div className="text-sm text-gray-600 mb-5">
          <p>Maximum file sizes:</p>
          <ul className="list-disc ml-5">
            {/* <li>Images: {MAX_IMAGE_SIZE / (1024 * 1024)}MB</li> */}
            <li>Videos: {MAX_VIDEO_SIZE / (1024 * 1024)}MB</li>
          </ul>
        </div>
        <input
        
          type="file"
          accept="image/*,video/*"
          onChange={handleFileUpload}
          className="border p-2"
          disabled={isLoading}
        />
        {uploadTime && (
          <div className="text-sm text-gray-600 mt-2">
            <p>Upload time: {uploadTime} seconds</p>
            {originalSize && compressedSize && (
              <p>Size: {originalSize}KB → {compressedSize}KB 
                ({Math.round((compressedSize/originalSize) * 100)}% of original)
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mb-4">
        <h2>Retrieve Image</h2>
        <input
        
          type="text"
          value={imageId}
          onChange={(e) => setImageId(e.target.value)}
          placeholder="Enter image ID"
          className="border p-2 mr-2 bg-white"
          disabled={isLoading}
        />
        <button
          onClick={retrieveImage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          Retrieve
        </button>
        {downloadTime && (
          <p className="text-sm text-gray-600 mt-2">
            Download time: {downloadTime} seconds
          </p>
        )}
      </div>

      {retrievedImage && (
        <div>
          <h2>Retrieved Media</h2>
          {mediaType === 'video' ? (
            <video 
              src={retrievedImage} 
              controls 
              className="max-w-md"
            />
          ) : (
            <img 
              src={retrievedImage} 
              alt="Retrieved" 
              className="max-w-md" 
            />
          )}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Stored Media Files</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg text-center">
            <thead className="bg-gray-50">
              <tr>
                <th onClick={() => handleSort('id')} 
                    className="px-6 py-3 cursor-pointer hover:bg-gray-100">
                  ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('size')} 
                    className="px-6 py-3 cursor-pointer hover:bg-gray-100">
                  Size (KB) {sortField === 'size' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('created_at')} 
                    className="px-6 py-3 cursor-pointer hover:bg-gray-100">
                  Created At {sortField === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3">Est. Download Time (s)</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {imageList.map((media) => (
                <tr key={media.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{media.id}</td>
                  <td className="px-6 py-4">{media.size}</td>
                  <td className="px-6 py-4">
                    {new Date(media.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{media.estimatedTime}</td>
                  <td className="px-6 py-4">{media.isVideo ? 'Video' : 'Image'}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => {
                        setMediaType(media.isVideo ? 'video' : 'image');
                        handleImageClick(media.id);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View
                    </button>
                    <a
                      href={media.downloadUrl}
                      className="text-green-500 hover:text-green-700 ml-2"
                      download={`media-${media.id}${media.isVideo ? '.mp4' : '.jpg'}`}
                    >
                      Download
                    </a>
                    <button
                      onClick={() => handleDelete(media.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
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
  );
}
