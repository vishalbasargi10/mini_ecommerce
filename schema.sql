
CREATE DATABASE IF NOT EXISTS online_shopping;
USE online_shopping;

-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Drop all tables
DROP TABLE IF EXISTS wishlist;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

-- Create Wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description VARCHAR(100) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE IF NOT EXISTS cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description VARCHAR(100) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE IF NOT EXISTS review (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);


-- Insert into Categories table with category_id
INSERT INTO Categories (category_id, name) VALUES
(1, 'Electronics'), 
(2, 'Books'), 
(3, 'Fashion'), 
(4, 'Home & Kitchen'), 
(5, 'Beauty & Health'),
(6, 'Sports & Outdoors'), 
(7, 'Automotive'), 
(8, 'Toys & Games'), 
(9, 'Grocery'), 
(10, 'Jewelry'),
(11, 'Watches'), 
(12, 'Computers'), 
(13, 'Music'), 
(14, 'Office Supplies'), 
(15, 'Garden & Outdoors'),
(16, 'Pet Supplies'), 
(17, 'Baby Products'), 
(18, 'Shoes'), 
(19, 'Luggage'), 
(20, 'Furniture'),
(21, 'Musical Instruments'), 
(22, 'Video Games'), 
(23, 'Software'), 
(24, 'Movies & TV'), 
(25, 'Handmade');

-- Insert sample products with appropriate category_id
INSERT INTO Products (name, description, price, category_id) VALUES
('Fitness Tracker', 'Wearable fitness tracker with heart rate monitor', 5000.00, 1),
('Wireless Charger', 'Fast wireless charger for smartphones', 1500.00, 1),
('Historical Fiction Book', 'Engaging historical fiction novel', 600.00, 2),
('Cookware Set', 'Non-stick cookware set with 5 pieces', 4500.00, 4),
('Essential Oils Set', 'Set of 6 essential oils for aromatherapy', 1200.00, 5),
('Camping Tent', '4-person camping tent with waterproof cover', 8000.00, 6),
('Car Dash Camera', 'HD dash camera with night vision', 4000.00, 7),
('Puzzle Game', '1000-piece jigsaw puzzle for adults', 1000.00, 8),
('Organic Coffee', '500g pack of organic coffee beans', 700.00, 9),
('Gold Bracelet', '14k gold bracelet with elegant design', 15000.00, 10),
('Luxury Watch', 'Luxury wristwatch with sapphire crystal', 50000.00, 11),
('Gaming Mouse', 'Ergonomic gaming mouse with RGB lighting', 2500.00, 12),
('Classical Music CD', 'Collection of classical music compositions', 800.00, 13),
('Office Desk', 'Spacious office desk with drawers', 10000.00, 14),
('Garden Swing', 'Outdoor garden swing for relaxation', 15000.00, 15),
('Cat Tree', 'Multi-level cat tree with scratching posts', 6000.00, 16),
('Baby Monitor', 'Video baby monitor with night vision', 4500.00, 17),
('Men\'s Sneakers', 'Comfortable sneakers for casual wear', 3000.00, 18),
('Suitcase Set', '3-piece luggage set with hard shells', 12000.00, 19),
('Recliner Chair', 'Comfortable recliner chair with footrest', 20000.00, 20),
('Keyboard Piano', '88-key digital keyboard piano', 25000.00, 21),
('VR Headset', 'Virtual reality headset for immersive gaming', 15000.00, 22),
('Photo Editing Software', 'Professional photo editing software', 5000.00, 23),
('DVD Collection', 'Box set of popular movies on DVD', 4000.00, 24),
('Handmade Scarf', 'Handwoven scarf with intricate patterns', 2000.00, 25),
('Smart Home Hub', 'Central hub for smart home devices', 7000.00, 1),
('Portable Hard Drive', '1TB portable external hard drive', 4000.00, 12),
('Blender', 'High-speed blender with multiple settings', 5000.00, 4),
('Perfume', 'Luxury perfume with floral scent', 3000.00, 5),
('Women\'s Handbag', 'Stylish leather handbag for women', 4000.00, 3),
('Treadmill', 'Foldable treadmill with LCD display', 30000.00, 6),
('Car Audio System', 'High-quality car audio system with Bluetooth', 12000.00, 7),
('Board Book for Kids', 'Educational board book for toddlers', 500.00, 8),
('Organic Tea', 'Assorted organic tea bags', 600.00, 9),
('Platinum Ring', 'Elegant platinum ring with diamond', 60000.00, 10),
('Smartwatch with GPS', 'Smartwatch with GPS and heart rate monitor', 8000.00, 11),
('Gaming Keyboard', 'Mechanical keyboard with customizable keys', 6000.00, 12),
('Vinyl Record', 'Classic album on vinyl record', 2000.00, 13),
('Desk Organizer', 'Multi-compartment desk organizer', 1500.00, 14),
('Patio Furniture Set', 'Outdoor patio furniture set with cushions', 35000.00, 15),
('Pet Grooming Kit', 'Complete grooming kit for pets', 3000.00, 16),
('Baby Carrier', 'Ergonomic baby carrier for comfort', 3500.00, 17),
('Women\'s Boots', 'Stylish winter boots for women', 4000.00, 18),
('Travel Pillow', 'Memory foam travel pillow for neck support', 1500.00, 19),
('Bookshelf', '5-tier wooden bookshelf for home', 8000.00, 20),
('Drum Set', 'Complete drum set for beginners', 30000.00, 21),
('Gaming Chair', 'Ergonomic gaming chair with lumbar support', 15000.00, 22),
('Programming Software', 'Integrated development environment (IDE)', 8000.00, 23),
('TV Series Box Set', 'Complete series of a popular TV show on Blu-ray', 10000.00, 24),
('Handmade Jewelry Box', 'Beautiful wooden jewelry box with carvings', 2500.00, 25);


INSERT INTO Wishlist (product_id, name, price, description) VALUES
(10, 'Gold Bracelet', 15000.00, '14k gold bracelet with elegant design'),
(15, 'Garden Swing', 15000.00, 'Outdoor garden swing for relaxation'),
(22, 'VR Headset', 15000.00, 'Virtual reality headset for immersive gaming'),
(5, 'Essential Oils Set', 1200.00, 'Set of 6 essential oils for aromatherapy'),
(19, 'Suitcase Set', 12000.00, '3-piece luggage set with hard shells');
  

INSERT INTO cart (product_id, name, price, description) VALUES
(10, 'Gold Bracelet', 15000.00, '14k gold bracelet with elegant design'),
(5, 'Essential Oils Set', 1200.00, 'Set of 6 essential oils for aromatherapy'),
(19, 'Suitcase Set', 12000.00, '3-piece luggage set with hard shells');


INSERT INTO review (product_id, rating, review) VALUES
(1, 5, 'Excellent fitness tracker, very accurate and easy to use.'),
(2, 4, 'Charges my phone quickly, but the build quality could be better.'),
(3, 5, 'Amazing book, couldn\'t put it down!'),
(4, 3, 'Cookware set is good but not as non-stick as I expected.'),
(5, 4, 'Great essential oils set, very soothing and aromatic.'),
(6, 5, 'Best camping tent I\'ve ever used, highly recommend it.'),
(7, 4, 'Works well, but the night vision could be clearer.'),
(8, 5, 'Challenging and fun puzzle game, perfect for family nights.'),
(9, 5, 'Delicious coffee, very fresh and aromatic.'),
(10, 5, 'Beautiful bracelet, exactly as described.');
