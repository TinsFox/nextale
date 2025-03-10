export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const JWT_SECRET = process.env.JWT_SECRET;
export const globalPrefix = isProduction ? '/api/v1' : '';
