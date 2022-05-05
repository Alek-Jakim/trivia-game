const connectToDB = require('serverless-mysql')({
    config: {
        host: process.env.TRIVIA_HOST,
        database: process.env.TRIVIA_DB,
        user: process.env.TRIVIA_USER,
        password: process.env.TRIVIA_PASS
    }
});

export default connectToDB;