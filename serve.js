const express=require('express');
const path =require('path');
const app = express();
const cors =require('cors');

const {logger} = require('./middleware/logEvent');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', express.static(path.join(__dirname,'/public')));
app.use('/info', require('./router/api/info'));
app.use('/register', require('./router/api/register'));
app.use('/auth', require('./router/api/auth'));


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

