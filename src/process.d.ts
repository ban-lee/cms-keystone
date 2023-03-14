declare namespace NodeJS {
  interface ProcessEnv {
    DB_URL: string;
    SESSION_SECRET: string;

    CLOUDINARY_NAME: string;
    CLOUDINARY_KEY: string;
    CLOUDINARY_SECRET: string;
  }
}
