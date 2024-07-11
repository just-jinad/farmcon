import React, { useEffect, useState } from 'react';
import Options from '../../components/options/options';
import Column from '../../components/charts/marketing-bar/column';
import Pie from '../../components/charts/marketing-pie/pie';
import Items from '../../components/admin-items/items';
import Staff from '../../components/staff-report/staff';
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader';

const Marketing = () => {
  const [products, setProducts] = useState([]);
  const [topItems, setTopItems] = useState({ topSelling: [], topGrossing: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('jwtToken'));
        const response = await axios.get('http://localhost:8888/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        transformProductsData(response.data);
      } catch (error) {
        console.error('Error fetching user products:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    };

    fetchProducts();
  }, []);

  const transformProductsData = (products) => {
    const topSelling = products.slice(0, 3); // Assuming top 3 items for top selling
    const topGrossing = products.slice(3, 6); // Assuming next 3 items for top grossing

    setTopItems({
      topSelling: transformToTopItems(topSelling),
      topGrossing: transformToTopItems(topGrossing),
    });
  };

  const transformToTopItems = (items) => {
    return items.map((item) => ({
      img: item.imagePath, // Assuming your product has an image field
      text: item.productName, // Assuming your product has a name field
      description: item.productDescription, // Assuming your product has a description field
      money: `$${item.price.toFixed(2)}`, // Assuming your product has a price field
      category: item.category, // Assuming your product has a category field
    }));
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="">
        {/* changes the date */}
        <Options />
      </div>
      <div className="flex mb-6 gap-6 flex-wrap lg:flex-nowrap justify-between">
        <div className="w-full">
          <Column />
        </div>
        <div className="w-full">
          <Pie />
        </div>
      </div>
      <div className="w-full gap-6 lg:flex-nowrap flex-wrap flex justify-between">
        {loading ? (
          <HashLoader />
        ) : (
          <>
            <Items array={{ title: 'Top selling items', items: topItems.topSelling }} />
            <Items array={{ title: 'Top grossing items', items: topItems.topGrossing }} />
          </>
        )}
      </div>
      <div className="w-full my-6">
        <Staff />
      </div>
    </div>
  );
};

export default Marketing;
