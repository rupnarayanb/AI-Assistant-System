    

if(!process.env.JWT_ACCESS_SECRET){
    throw new Error('JWT_ACCESS_SECRET environment variable is not set');
}

if(!process.env.JWT_REFRESH_SECRET){
    throw new Error('JWT_REFRESH_SECRET environment variable is not set');
}

module.exports = {
    db: {
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
         host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 5432),
        database: process.env.DB_NAME || 'ai_assistant'
    },
    jwt: {
        accessTokenSecret: process.env.JWT_ACCESS_SECRET,
        refreshTokenSecret: process.env.JWT_REFRESH_SECRET
    }
}