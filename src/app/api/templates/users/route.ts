import imagekit from '@/lib/imagekit'; // Import your ImageKit utility
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { file, fileName } = await req.json();
    const folder = process.env.NEXT_PUBLIC_IMAGEKIT_FOLDER || 'resumes';

    // Validate the request body
    if (!file || !fileName) {
      return NextResponse.json({ message: 'File and fileName are required' }, { status: 400 });
    }

    // Upload the file to ImageKit
    const result = await imagekit.upload({
      file: file, // Base64 file
      fileName: fileName, // Unique file name
      useUniqueFileName: false, // Overwrite if file exists
      folder: folder,
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

export async function DELETE(req: Request) {
  try {
    const { slug, hasPaid } = await req.json();
    console.log('Deleting resume:', slug);
    // Validate input
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug in request' }, { status: 400 });
    }

    // Search for fileId using file name
    const filename = `name='${slug}'`;
    // console.log('Searching for file:', filename);
    const folder = process.env.NEXT_PUBLIC_IMAGEKIT_FOLDER || 'resumes';
    const files = await imagekit.listFiles({ searchQuery: filename, path: `/${folder}/` });
    // console.log('Files:', files);
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'File not found in ImageKit' }, { status: 404 });
    }

    // Find the correct file with a valid fileId
    const file = files.find((f) => 'fileId' in f);

    if (!file || !('fileId' in file)) {
      return NextResponse.json(
        { error: 'Invalid file data received from ImageKit' },
        { status: 500 }
      );
    }

    // Delete the file from ImageKit
    await imagekit.deleteFile(file.fileId);

    if (hasPaid) {
      const filename2 = `name='${slug}'`;
      // console.log('Searching for file:', filename);
      const folder = 'shared-resumes';
      const files2 = await imagekit.listFiles({ searchQuery: filename2, path: `/${folder}/` });
      // console.log('Files:', files2);
      if (!files2 || files2.length === 0) {
        return NextResponse.json({ error: 'File not found in ImageKit' }, { status: 404 });
      }

      // Find the correct file with a valid fileId
      const file2 = files2.find((f) => 'fileId' in f);

      if (!file2 || !('fileId' in file2)) {
        return NextResponse.json(
          { error: 'Invalid file data received from ImageKit' },
          { status: 500 }
        );
      }
      await imagekit.deleteFile(file2.fileId);
    }
    // Return response with cache-busting headers
    return new Response(JSON.stringify({ message: 'Resume deleted successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('❌ DELETE Resume Error:', error);
    return new Response(JSON.stringify({ message: 'Failed to delete resume' }), {
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
