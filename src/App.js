import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import './App.scss';
import Refresh from './Refresh';
import Confirmation from './scenes/checkout/Confirmation';
import AddToWatchList from './scenes/global/AddToWatchList';
import CartMenu from './scenes/global/CartMenu';
import Footer from './scenes/global/Footer';
import Navbar from './scenes/global/Navbar';
import Home from './scenes/home/Home';
import ItemDetails from './scenes/itemDetails/ItemDetails';
import Search from './scenes/search/Search';

function App() {

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };




  return (
    <div className="main">
      <Router>
        <Refresh />
        <ScrollToTop />

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="item/:itemId" element={<ItemDetails />} />

          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
        <Search />
        <CartMenu />
        <AddToWatchList />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
