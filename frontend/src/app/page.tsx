import type { NextPage } from 'next';
import Navbar from '@/components/Navbar';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';

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
