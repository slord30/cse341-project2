const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./db/connect');
const indexRoutes = require('./routes/index');
const passport = require('passport');
const session = require('express-session');
const { deleteOne } = require('./models/author');
const GitHubStrategy = require('passport-github2').Strategy;


const port = process.env.PORT || 3000;

connectDB().catch(err => {
    console.log("Failed to start server: ", err);
});

// Sessions first
app.use(express.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}))

// Passport second
app.use(passport.initialize())
app.use(passport.session())

// Body Parser third
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

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

//Add endpoints for OAuth
app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}`: "Logged Out")
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', 
    session: true}),
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});


// Routes last
app.use('/', indexRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
