import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import myImage from "../img/bg/p2.png";
import Header from "../components/Header3";
import "../styles/animation.css";
import { categories } from "./categories/Category";
import Search from "./SearchBar";
import Footer from "../components/Footer";

const Home = () => {
  const [category, setcategory] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    fetchcategory();
    fetchFeaturedProducts();
  }, []);

  const fetchcategory = async () => {
    try {
      const response = await axios.get("/api/category/list");
      setcategory(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get("/api/products/featured");
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };

  const filteredcategory = category.filter((category) => {
    return (
      category.categoryName &&
      category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Header />
      <section
        id="hero"
        className="h-screen bg-gradient-to-r from-yellow-50 to-green-200"
      >
        {/*search bar starts  */}
        <div className="fixed top-4 left-48 lg:w-1/3 md:w-1/4 sm:w-1/4 z-20 my-2">
          <Search onSearch={handleSearch} />
        </div>
        {/*search bar ends  */}

        <div className="flex flex-col-reverse items-center px-6 py-10 space-y-6 md:space-y-0 md:flex-row">
          <div className="flex flex-col space-y-8 md:w-3/4">
            <h2 className="text-green-800 font-bold text-3xl text-center md:text-5xl md:text-center md:w-full">
              Elevate Your <span className="text-yellow-600">Shopping </span>
              Experience with Our Vast Selection
            </h2>
            <p className="text-green-700 font-bold text-xl text-center md:text-center md:text-3xl">
              Competitive Prices, Stellar Time Consuming and Fast Service
            </p>

            <div className="container flex justify-center md:justify-center">
              <div className="container flex flex-row justify-center">
                <Link
                  to="#"
                  className="px-6 p-3 bg-yellow-600 my-4 mx-4 font-bold rounded-md text-white "
                >
                  Shop with Us
                </Link>
                <Link className="bg-white p-3 my-4 font-bold rounded-md text-yellow-600 ">
                  {" "}
                  <Link to="/contact">Contact Us</Link>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-1/2 md:w-1/2">
            <img
              src={myImage}
              alt="Background"
              className="w-full h-auto md:max-h-full move-up-down"
            />
          </div>
        </div>
      </section>

      <section id="Categories" className="container bg-white py-2">
        <div className="flex flex-col md:flex-row space-y-0 md:space-y-0">
          <div className="w-full mx-auto md:full justify-center items-center">
            <h2 className="text-2xl text-center font-bold">Top category</h2>

            <div className="w-full p-4 flex-cols justify-center items-center">
              <div className="p-2 grid grid-cols-2 xs:grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredcategory.map((category) => (
                  <div
                    key={category._id}
                    className="relative overflow-hidden rounded-full m-2 shadow-lg transition-transform transform hover:scale-105 duration-300"
                    style={{
                      width: "200px",
                      height: "200px",
                    }}
                  >
                    <div className="aspect-w-1 aspect-h-1 m-4">
                      <div className="rounded-full overflow-hidden">
                        <Link to={`/${category.categoryName}`}>
                          <img
                            src={`/uploads/category/${category.categoryImage}`}
                            alt={category.categoryName}
                            className="object-cover w-full h-full"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-700 to-transparent p-4">
                      <Link to={`/${category.categoryName}`}>
                        <p className="text-white text-center text-lg font-semibold">
                          {category.categoryName}
                        </p>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="featuredProduct" className="border shadow-lg py-2 px-6">
        <div className="container mx-auto py-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <div key={product._id} className="w-full" timeout={300}>
                <div className="p-2 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300">
                  <img
                    src={`/uploads/${product.categoryName}/${product.image}`}
                    alt={product.name}
                    className="mb-2 sm:h-16 md:h-36 lg:h-40 mx-auto rounded-lg cursor-pointer"
                  />
                  <div className="flex space-x-10 mb-2">
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p className="text-gray-500">
                      {product.price.toFixed(2)}{" "}
                      <span className="font-bold">Birr</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button
              onClick={toggleModal}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Show More
            </button>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded-lg overflow-y-auto max-h-screen relative">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              All Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.map((product) => (
                <div key={product._id} className="w-full" timeout={300}>
                  <div className="p-2 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300">
                    <img
                      src={`/uploads/${product.categoryName}/${product.image}`}
                      alt={product.name}
                      className="mb-2 sm:h-16 md:h-36 lg:h-40 mx-auto rounded-lg cursor-pointer"
                    />
                    <div className="flex space-x-10 mb-2">
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      <p className="text-gray-500">
                        {product.price.toFixed(2)}{" "}
                        <span className="font-bold">Birr</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Home;
