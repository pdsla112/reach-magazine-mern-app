const express = require('express');
const app = express();
app.disable('x-powered-by');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
const path = require("path");
const unorm = require("unorm");
const cryptoRandomString = require("crypto-random-string");
const randomInt = require("random-int");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

require('dotenv').config();

function getRandomSecret() {
    const randomNum = randomInt(10, 20);
    const randomSecret = cryptoRandomString({length: randomNum});
    const normalizedSecret = unorm.nfkc(randomSecret);
    return normalizedSecret;
}

app.use('/images', express.static(path.join(__dirname, '/images')));

app.use(helmet());

// app.use(cors({
//     origin: 'https://dry-cove-41912.herokuapp.com',
//     credentials: true 
// }));
app.use(cors());
app.use(bodyParser.json());

const store = new MongoDBStore({
    uri: process.env.MONGO_SESSION_URI,
    collection: "session"
});

store.on('error', (err) => {
    console.log(err);
});

app.use(require('express-session')({
    name: "reachSession",
    secret: getRandomSecret(),
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7  // 1 week session length
    },
    store: store,
    resave: true,
    saveUninitialized: false
}));

const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require("./routes/userRoutes");

app.use('/', articleRoutes);
app.use('/', userRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "../../client", "build", "index.html"));
    });
}

// app.use(express.static(path.join(__dirname, './client/build')));

// app.get('*', function(_, res) {
//   res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// });


const PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});