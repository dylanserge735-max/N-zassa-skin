import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Upload options for different use cases
export const uploadOptions = {
  skinAnalysis: {
    folder: 'nzassa-skin/analyses',
    transformation: [
      { width: 1024, height: 1024, crop: 'limit' },
      { quality: 'auto' },
      { fetch_format: 'auto' },
    ],
  },
  progressPhoto: {
    folder: 'nzassa-skin/progress',
    transformation: [
      { width: 1024, height: 1024, crop: 'limit' },
      { quality: 'auto' },
      { fetch_format: 'auto' },
    ],
  },
  profileImage: {
    folder: 'nzassa-skin/profiles',
    transformation: [
      { width: 400, height: 400, crop: 'fill', gravity: 'face' },
      { quality: 'auto' },
      { fetch_format: 'auto' },
    ],
  },
  productReview: {
    folder: 'nzassa-skin/reviews',
    transformation: [
      { width: 800, height: 800, crop: 'limit' },
      { quality: 'auto' },
      { fetch_format: 'auto' },
    ],
  },
};
