const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 8080;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vishal2003@',
    database: 'online_shopping'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

global.db = db;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'views')));

// Home
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// Products--get
app.get("/products", (req, res) => {
    let q = `SELECT * FROM Products`;
    db.query(q, (err, result) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send('Internal Server Error');
        }
        let products = result;
        res.render("products.ejs", { products });
    });
});
//addNewProduct--form
app.get("/products/addNewProduct", (req, res) => {
    let q = `SELECT * FROM Categories`;
    db.query(q, (err, result) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).send('Internal Server Error');
        }
        let categories = result;
        res.render("addNewProduct.ejs", { categories });
    });
});

// Add new product---post
app.post('/products', (req, res) => {
    const { name, description, price, category_id } = req.body;

    if (!name || !description || !price || !category_id) {
        return res.status(400).send('All fields are required.');
    }

    const query = 'INSERT INTO Products (name, description, price, category_id) VALUES (?,?,?,?)';
    
    console.log('Attempting to insert product:', req.body);

    db.query(query, [name, description, price, category_id], (err, result) => {
        if (err) {
            console.error('Failed to add product:', err);
            return res.status(500).send('Failed to add product.');
        }
        console.log('Product added successfully:', result);
        res.redirect("/products");
    });
});
//products--delete
app.post('/products/delete/:product_id', (req, res) => {
    const { product_id } = req.params;

    const query = 'DELETE FROM products WHERE product_id = ?';
    
    console.log('Attempting to delete product:', product_id);

    db.query(query, [product_id], (err, result) => {
        if (err) {
            console.error("WE CAN DELETE AS THIS PRODUCT IS USED IN CART OR WISHLIST. IT HAS FOREGIN KEY CONSTRAINT");
            return res.status(500).send("WE CAN DELETE AS THIS PRODUCT IS USED IN CART OR WISHLIST. IT HAS FOREGIN KEY CONSTRAINT");
        }
        console.log('Product deleted successfully:', result);
        res.redirect("/products");
    });
});


// -----------------------------------------------------------------------------------------------------
//cart--post
app.post('/cart', (req, res) => {
    const { product_id, name, price,description } = req.body;

    // Ensure all required fields are present
    if (!product_id || !name || !price || !description) {
        return res.status(400).send('Missing required fields.');
    }

    const query = 'INSERT INTO cart (product_id, name, price,description) VALUES (?, ?, ?,?)';
    
    db.query(query, [product_id, name, price,description], (err, result) => {
        if (err) {
            console.error('Failed to add product to wishlist:', err);
            return res.status(500).send('Failed to add product to wishlist.');
        }
        console.log('Product added to wishlist successfully:', result);
        res.redirect('/cart');
    });
});
// Cart--get
app.get("/cart", (req, res) => {
    let q = `SELECT * FROM cart`;
    db.query(q, (err, result) => {
        if (err) {
            console.error('Error fetching cart:', err);
            return res.status(500).send('Internal Server Error');
        }
        let carts = result;
        let totalPrice = carts.reduce((sum, product) => sum + parseFloat(product.price), 0);
        res.render("cart.ejs", { carts,totalPrice });
    });
});
//cart--delete
app.post('/cart/delete/:product_id', (req, res) => {
    const { product_id } = req.params;

    const query = 'DELETE FROM cart WHERE product_id = ?';
    
    console.log('Attempting to delete product:', product_id);

    db.query(query, [product_id], (err, result) => {
        if (err) {
            console.error('Failed to delete product:', err);
            return res.status(500).send('Failed to delete product.');
        }
        console.log('Product deleted successfully:', result);
        res.redirect("/cart");
    });
});



// --------------------------------------------------------------------------------------------
// Categories---get
app.get("/categories", (req, res) => {
    let q = `SELECT * FROM Categories`;
    db.query(q, (err, result) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).send('Internal Server Error');
        }
        let categories = result;
        res.render("categories.ejs", { categories });
    });
});
//showing products from categories
app.get("/categories/:category_id", (req, res) => {
    let { category_id } = req.params;
    let q = `SELECT * FROM Products WHERE category_id = ?`;
    db.query(q, [category_id], (err, result) => {
        if (err) {
            console.error('Error fetching products for category:', err);
            return res.status(500).send('Internal Server Error');
        }
        let products = result;
        res.render("products.ejs", { products });
    });
});



// ------------------------------------------------------------------------------------------------------
// Wishlist---get
app.get("/wishlist", (req, res) => {
    let q = `SELECT * FROM wishlist`;
    db.query(q, (err, result) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).send('Internal Server Error');
        }
        let wishlist = result;
        res.render("wishlist.ejs", {wishlist});
    });
});
//wishlist--post
app.post('/wishlist', (req, res) => {
    const { product_id, name, price,description } = req.body;

    // Ensure all required fields are present
    if (!product_id || !name || !price || !description) {
        return res.status(400).send('Missing required fields.');
    }

    const query = 'INSERT INTO wishlist (product_id, name, price,description) VALUES (?, ?, ?,?)';
    
    db.query(query, [product_id, name, price,description], (err, result) => {
        if (err) {
            console.error('Failed to add product to wishlist:', err);
            return res.status(500).send('Failed to add product to wishlist.');
        }
        console.log('Product added to wishlist successfully:', result);
        res.redirect('/products');
    });
});
//wishlist--delete
app.post('/wishlist/delete/:product_id', (req, res) => {
    const { product_id } = req.params;

    const query = 'DELETE FROM wishlist WHERE product_id = ?';
    
    console.log('Attempting to delete product:', product_id);

    db.query(query, [product_id], (err, result) => {
        if (err) {
            console.error('Failed to delete product:', err);
            return res.status(500).send('Failed to delete product.');
        }
        console.log('Product deleted successfully:', result);
        res.redirect("/wishlist");
    });
});

// ----------------------------------------------------------------------------------------------------------
//placed-get
app.get("/placed", (req, res) => {
    res.render("placed.ejs");
});

// --------------------------------------------------------------------------------------------------------------
// My Profile
app.get("/myprofile", (req, res) => {
    // let q = `SELECT * FROM users WHERE user_id = ?`; // Adjust query as needed
    // let userId = 1; // Assume user ID is 1 for now
    // db.query(q, [userId], (err, result) => {
    //     if (err) {
    //         console.error('Error fetching profile:', err);
    //         return res.status(500).send('Internal Server Error');
    //     }
    //    let profile = result[0]; // Assuming result is an array
        res.render("myprofile.ejs");
    //});
});

// -------------------------------------------------------------------------------------------------------
// Add Review
app.post('/:product_id/review', (req, res) => {
    const { rating, review } = req.body;
    const { product_id } = req.params;
    if (!rating || !review || !product_id) 
        return res.status(400).send('Invalid review data.');

    const query = 'INSERT INTO review (product_id, rating, review) VALUES (?, ?, ?)';
    db.query(query, [product_id, rating, review], (err, result) => {
        if (err) return res.status(500).send('Error adding review.');
       res.redirect(`/products/review?product_id=${product_id}`)
    });
});


// View Reviews
app.get('/review/:product_id', (req, res) => {
    const { product_id } =
     req.params;
    const query = 'SELECT * FROM review WHERE product_id = ?';

    db.query(query, [product_id], (err, reviews) => {
        if (err) return res.status(500).send('Error fetching reviews.');
        res.render('review.ejs', { reviews });
    });
});

//addNewReviews--form
app.get("/products/addNewReview", (req, res) => {
    const { product_id } = req.query;
    res.render("addNewReview.ejs", { product_id });
});

// New GET route
app.get('/products/review', (req, res) => {
    const { product_id } = req.query;

    if (!product_id) {
        return res.status(400).send('Product ID is required.');
    }

    const query = 'SELECT * FROM review WHERE product_id = ?';

    db.query(query, [product_id], (err, reviews) => {
        if (err) {
            console.error('Failed to retrieve reviews:', err);
            return res.status(500).send('Failed to retrieve reviews.');
        }
        res.render('review.ejs',{reviews,product_id});
    });
});

app.post('/products/:product_id/addNewReview', (req, res) => {
    const { product_id, rating, review } = req.body;

    if (!product_id || !rating || !review) {
        return res.status(400).send('All fields are required.');
    }

    const query = 'INSERT INTO review (product_id, rating, review) VALUES (?, ?, ?)';
    
    console.log('Attempting to insert review:', req.body);

    db.query(query, [product_id, rating, review], (err, result) => {
        if (err) {
            console.error('Failed to add review:', err);
            return res.status(500).send('Failed to add review.');
        }
        console.log('Review added successfully:', result);
        res.redirect(`/review?product_id=${product_id}`);
    });
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
