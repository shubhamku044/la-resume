# Resume Sharing API

This API allows users to share their resumes publicly with a unique URL.

## Endpoints

### Create a Shared Resume

- **POST** `/api/sharing`
  - Creates a new shared resume
  - Uploads the PDF to Amazon S3
  - Returns a unique shareId

### List Shared Resumes

- **GET** `/api/sharing`
  - Lists all shared resumes for the authenticated user

### Get Shared Resume

- **GET** `/api/sharing/[shareId]`
  - Retrieves a shared resume by its shareId
  - Optionally increments the view count

### Delete Shared Resume

- **DELETE** `/api/sharing/[shareId]`
  - Deletes a shared resume
  - Removes the PDF from Amazon S3

## Implementation Details

The shared resume functionality has been updated to use Amazon S3 for file storage instead of ImageKit. The implementation includes:

1. A utility module (`shareUtils.ts`) for S3 operations related to shared resumes
2. API endpoints for creating, retrieving, and deleting shared resumes
3. Proper authentication and error handling

## Environment Variables

The following environment variables are required:

```
AWS_REGION=us-west-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET_NAME=your_bucket_name
NEXT_PUBLIC_S3_SHARED_FOLDER=shared-resumes
```
