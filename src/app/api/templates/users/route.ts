import { NextResponse } from 'next/server';
import imagekit from '@/lib/imagekit'; // Import your ImageKit utility

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { file, fileName } = await req.json();

    // Validate the request body
    if (!file || !fileName) {
      return NextResponse.json({ message: 'File and fileName are required' }, { status: 400 });
    }

    // Upload the file to ImageKit
    const result = await imagekit.upload({
      file: file, // Base64 file
      fileName: fileName, // Unique file name
      useUniqueFileName: false, // Overwrite if file exists
      folder: 'resumes', // Optional: Organize files in a folder
    });

    // Append a cache-busting timestamp to the URL
    const timestamp = Date.now();
    const cacheBustedUrl = `${result.url}?v=${timestamp}`;

    // Return the ImageKit URL with cache-busting headers
    return new Response(JSON.stringify({ url: cacheBustedUrl }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error uploading image to ImageKit:', error);
    return new Response(JSON.stringify({ message: 'Failed to upload image' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }
}
