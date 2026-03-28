const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./db/connect');
const indexRoutes = require('./routes/index');
const passport = require('passport');
const session = require('express-session');
// const { deleteOne } = require('./models/author');
const GitHubStrategy = require('passport-github2').Strategy;
const MongoStore = require('connect-mongo').default;



const port = process.env.PORT || 3000;

//connect to database
connectDB().catch(err => {
    console.log("Failed to start server: ", err);
});

// --- MIDDLEWARE ORDER START --- 
//trust proxy 
app.set('trust proxy', 1);

//Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// --- SESSIONS ---
//session configuration (must be before passport)
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGODB_URI 
    }),
    cookie: {
        secure: true,
        sameSite: 'none',
        httpOnly: true
    }
}));


//passport inititialization
app.use(passport.initialize())
app.use(passport.session())

//CORS headers
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", process.env.BASE);
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
//     );
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
// });

// --- PASSPORT STRATEGY ---

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// --- OAUTH ENDPOINTS ---

// app.get('/', (req, res) => {
//     res.send(req.user !== undefined ? `Logged in as ${req.user.displayName}`: "Logged Out");
// });

// app.get('/github/callback', 
//     passport.authenticate('github', {
//         failureRedirect: '/api-docs'
//     }),
//     (req, res) => {
//         res.redirect('/');
//     }
// );

// --- ROUTES ---
//main router (must be after passport/session)
app.use('/', indexRoutes);

//start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
