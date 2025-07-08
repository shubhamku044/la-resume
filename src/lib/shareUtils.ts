import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client from './s3';

// Helper to get the S3 bucket name from environment variables
const getBucketName = () => {
  return process.env.AWS_BUCKET_NAME || 'la-resume-files';
};

// Helper to get the S3 folder name for shared resumes
const getSharedFolder = () => {
  return process.env.NEXT_PUBLIC_S3_SHARED_FOLDER || 'shared-resumes';
};

/**
 * Upload a shared resume PDF to S3
 * @param fileBuffer PDF file buffer
 * @param shareId Unique ID for the shared resume
 * @returns URL of the uploaded file
 */
export async function uploadSharedResume(fileBuffer: Buffer, shareId: string): Promise<string> {
  const key = `${getSharedFolder()}/${shareId}.pdf`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: getBucketName(),
      Key: key,
      Body: fileBuffer,
      ContentType: 'application/pdf',
      ContentDisposition: 'inline',
      CacheControl: 'max-age=31536000',
    })
  );

  // Construct the direct S3 URL
  const s3Url = `https://${getBucketName()}.s3.${process.env.AWS_REGION || 'us-west-1'}.amazonaws.com/${key}`;
  return s3Url;
}

/**
 * Delete a shared resume PDF from S3
 * @param shareId Unique ID for the shared resume
 * @returns boolean indicating success
 */
export async function deleteSharedResume(shareId: string): Promise<boolean> {
  try {
    const key = `${getSharedFolder()}/${shareId}.pdf`;
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: getBucketName(),
        Key: key,
      })
    );
    return true;
  } catch (error) {
    console.error('Error deleting shared resume from S3:', error);
    return false;
  }
}

/**
 * Generate a pre-signed URL for temporary access to a shared resume
 * @param shareId Unique ID for the shared resume
 * @param expiresIn Seconds until the URL expires (default: 24 hours)
 * @returns Pre-signed URL for accessing the file
 */
export async function getSharedResumePresignedUrl(
  shareId: string,
  expiresIn: number = 86400
): Promise<string> {
  const key = `${getSharedFolder()}/${shareId}.pdf`;

  const command = new GetObjectCommand({
    Bucket: getBucketName(),
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Get the public URL for a shared resume
 * @param shareId Unique ID for the shared resume
 * @returns Public URL for the shared resume
 */
export function getSharedResumePublicUrl(shareId: string): string {
  const key = `${getSharedFolder()}/${shareId}.pdf`;
  const s3Url = `https://${getBucketName()}.s3.${process.env.AWS_REGION || 'us-west-1'}.amazonaws.com/${key}`;
  return s3Url;
}
