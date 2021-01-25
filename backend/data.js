import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Oketo',
            email:'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'mellia',
            email:'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Nike Slim Shirt',
            category: 'Shirt',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 0,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product',
        },
        {
            name: 'Adidas Fit Shirt',
            category: 'Shirt',
            image: '/images/p2.jpg',
            price: 220,
            countInStock: 5,
            brand: 'Adidas',
            rating: 3.5,
            numReviews: 15,
            description: 'High quality product',
        },
        {
            name: 'Lacosta Slim Shirt',
            category: 'Shirt',
            image: '/images/p3.jpg',
            price: 320,
            countInStock: 50,
            brand: 'Lacosta',
            rating: 1.5,
            numReviews: 10,
            description: 'High quality product',
        },
        {
            name: 'Nike Slim Pants',
            category: 'Pants',
            image: '/images/p4.jpg',
            price: 20,
            countInStock: 10,
            brand: 'Nike',
            rating: 4,
            numReviews: 20,
            description: 'High quality product',
        },
        {
            name: 'Puma Slim Pants',
            category: 'Pants',
            image: '/images/p5.jpg',
            price: 100,
            countInStock: 15,
            brand: 'Puma',
            rating: 3.4,
            numReviews: 5,
            description: 'High quality product',
        },
        {
            name: 'Adidas Fit Pants',
            category: 'Pants',
            image: '/images/p6.jpg',
            price: 320,
            countInStock: 25,
            brand: 'Adidas',
            rating: 4,
            numReviews: 20,
            description: 'High quality product',
        },
    ]
};

export default data;