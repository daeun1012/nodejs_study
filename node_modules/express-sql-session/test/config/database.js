module.exports = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST !== undefined ? process.env.DB_HOST : 'localhost',
        user: process.env.DB_USER !== undefined ? process.env.DB_USER : 'root',
        password: process.env.DB_PASS !== undefined ? process.env.DB_PASS : '',
        database: process.env.DB_NAME !== undefined ? process.env.DB_NAME : 'session_test'
    },
    table: 'sessions'
};
