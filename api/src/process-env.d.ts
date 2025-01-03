namespace NodeJS {
    interface ProcessEnv {
        [key: string]: string | undefined;
        MONGO_URL: string;
        SECRET: string;
        PORT: string;
        DB_USER: string;
        DB_PASS: string;
    }
}
