import type { NextPage } from 'next';

import Banner from '../components/Banner';
import ProductList from '../components/ProductList';


const Home: NextPage = () => {
  return (
    <>
    
    <div>
      {/* <Navbar /> */}
      <Banner />
      <ProductList />
     
    </div>
    
    </>
  );
};

export default Home;
