import s3Client from '@/lib/s3';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

// Helper to get the S3 bucket name from environment variables
const getBucketName = () => {
  return process.env.AWS_BUCKET_NAME || 'la-resume-files';
};

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { file, fileName } = await req.json();
    const folder = process.env.NEXT_PUBLIC_S3_FOLDER || 'resumes';

    // Validate the request body
    if (!file || !fileName) {
      return NextResponse.json({ message: 'File and fileName are required' }, { status: 400 });
    }

    // Convert base64 file to buffer
    const buffer = Buffer.from(file.replace(/^data:.*?;base64,/, ''), 'base64');

    // Determine content type from base64 string
    const contentType = file.match(/^data:(.*?);base64,/)?.[1] || 'application/pdf';

    // Create key for S3 (path in bucket)
    const key = `${folder}/${fileName}`;

    // Upload the file to S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: getBucketName(),
        Key: key,
        Body: buffer,
        ContentType: contentType,
        ContentDisposition: 'inline',
        CacheControl: 'max-age=31536000',
      })
    );

    // Construct the direct S3 URL
    const s3Url = `https://${getBucketName()}.s3.${process.env.AWS_REGION || 'us-west-1'}.amazonaws.com/${key}`;

    // Append a cache-busting timestamp to the URL
    const timestamp = Date.now();
    const cacheBustedUrl = `${s3Url}?v=${timestamp}`;

    // Return the S3 URL with cache-busting headers
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
    console.error('Error uploading file to S3:', error);
    return new Response(JSON.stringify({ message: 'Failed to upload file' }), {
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

    // Validate input
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug in request' }, { status: 400 });
    }

    const folder = process.env.NEXT_PUBLIC_S3_FOLDER || 'resumes';
    const key = `${folder}/${slug}`;

    // Delete the file from S3
    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: getBucketName(),
          Key: key,
        })
      );
    } catch (error) {
      console.error(`Error deleting file ${key} from S3:`, error);
      return NextResponse.json({ error: 'File not found in S3' }, { status: 404 });
    }

    if (hasPaid) {
      try {
        const sharedKey = `${process.env.NEXT_PUBLIC_S3_SHARED_FOLDER}/${slug}.pdf`;

        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: getBucketName(),
            Key: sharedKey,
          })
        );
      } catch (error) {
        console.error('No shared resume found or error deleting shared file:', error);
      }
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
