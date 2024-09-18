import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container mx-auto px-4 py-2">
        <Outlet />
      </div>
    </>
  );
};

export default App;
