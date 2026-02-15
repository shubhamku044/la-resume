export const ASSET_BASE_URL = 'https://assets.la-resume.com';

export const getAssetUrl = (path: string) => {
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${ASSET_BASE_URL}${normalizedPath}`;
};
