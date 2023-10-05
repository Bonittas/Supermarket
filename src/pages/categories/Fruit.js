import React from 'react';
import 'tailwindcss/tailwind.css';
import Header from '../../components/Header3';
import watermelon from '../../img/watermelon.png';
import banana from '../../img/banana.png'
import orangeImage from '../../img/oranges.png';
import grapes from '../../img/grapes.png';

const Fruit = () => {
  const categories = [
    {
      name: 'Fruits',
      products: [
        { name: 'Apple', price: 1.99, image: watermelon },
        { name: 'Banana', price: 0.99, image: banana },
        { name: 'Orange', price: 1.49, image: orangeImage },
        { name: 'grapes', price: 1.49, image: orangeImage },

      ],
    },
    { name: 'Vegetables' },
    { name: 'Dairy Products' },
    { name: 'Snacks' },
    { name: 'Beverages' },
    { name: 'Meat and Seafood' },
    { name: 'Soap and Detergents' },
  ];

  const handleAddToCart = (product) => {
    // Add your logic to handle adding the product to the cart here
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <>
    <Header/>
    <div className="bg-green-50 min-h-screen pt-6">
      <div className="flex">
        <div className="w-1/4 bg-green-100 p-4 m-8 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index} className="cursor-pointer p-4 font-cursive font-bold text-lg hover:bg-green-200 transition-colors">
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 p-4 ">
          <h2 className="text-2xl font-bold mb-4">Fruits</h2>
          <div className="grid grid-cols-3 gap-4 h-3/4">
            {categories[0].products.map((product, index) => (
              <div key={index} className="border p-4 rounded-lg hover:shadow-lg transition-shadow">
                <img src={product.image} alt={product.name} className="mb-2 h-56 rounded-lg" />
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
                <button
                  className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-600 transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Fruit;