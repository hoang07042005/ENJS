const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const ejsLayouts = require('express-ejs-layouts');
const logger = require('morgan');
const createError = require('http-errors');
const multer = require('multer'); // Import multer

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart'); // Import the cart routes

const app = express();

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where uploaded files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Set unique filename
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.set('layout', 'main');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from the uploads directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter); // Use the cart routes

// Route to handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
    // Access the uploaded file through req.file
    console.log(req.file);

    // Handle other form data if needed
    console.log(req.body);

    // Save file information to the database or process further
    
    // Redirect or render a response
    res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
