import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faLeaf, faBirthdayCake, faCut, faWineBottle, faCheese } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header3';
import Footer from '../components/Footer';
const OurServicesPage = () => {
  const services = [
    {
      title: 'Online Shopping',
      description: 'Shop for groceries online and have them delivered to your doorstep. Browse through a wide selection of products, create shopping lists, and enjoy convenient and contactless delivery.',
      icon: faShoppingCart,
      bgColor: '#E6F0F9', // Light blue
    },
    {
      title: 'Fresh Produce',
      description: 'Explore a wide range of fresh fruits, vegetables, and herbs sourced directly from local farms. We prioritize quality and freshness to ensure you have access to the best produce.',
      icon: faLeaf,
      bgColor: '#E8FCE5', // Light green
    },
    {
      title: 'Bakery',
      description: 'Discover a variety of freshly baked bread, cakes, and pastries made with love by our skilled bakers. From classic favorites to unique creations, indulge in delightful baked goods.',
      icon: faBirthdayCake,
      bgColor: '#FFF7E9', // Light yellow
    },
    {
      title: 'Butcher Shop',
      description: 'Enjoy high-quality meats and cuts from our skilled butchers. We offer a wide range of options, including premium steaks, poultry, seafood, and specialty cuts to elevate your culinary experience.',
      icon: faCut,
      bgColor: '#FDEAF0', // Light pink
    },
    {
      title: 'Wine Selection',
      description: 'Indulge in a curated collection of exquisite wines from around the world. Our sommeliers carefully select each bottle to provide you with a diverse and exceptional wine selection.',
      icon: faWineBottle,
      bgColor: '#FAF4E8', // Light cream
    },
    {
      title: 'Gourmet Deli',
      description: 'Experience a delightful assortment of artisan cheeses and charcuterie. From imported cheeses to locally crafted delicacies, our gourmet deli offers a feast for your taste buds.',
      icon: faCheese,
      bgColor: '#FDE9D9', // Light orange
    },
  ];

  return (
    <>
   <Header/>
    <div className=" mx-6 py-12">
      <h1 className="text-4xl md:text-4xl font-bold text-yellow-600 font-cursive mb-8 text-center">Discover Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-green-50 rounded-lg shadow p-8">
            <div
              className="flex items-center justify-center h-16 w-16 rounded-full mb-6"
              style={{ background: service.bgColor }}
            >
              <FontAwesomeIcon icon={service.icon} className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">{service.title}</h2>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default OurServicesPage;