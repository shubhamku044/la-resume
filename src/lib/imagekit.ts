import ImageKit from '@imagekit/nodejs';

// Configure the ImageKit server SDK.
// The new @imagekit/nodejs SDK is API-only and authenticates with the private
// key (webhookSecret is only needed for verifying webhook signatures). The old
// publicKey/urlEndpoint values were used for client-side URL generation, which
// this server helper does not perform.
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  webhookSecret: process.env.IMAGEKIT_WEBHOOK_SECRET,
});

export default imagekit;
