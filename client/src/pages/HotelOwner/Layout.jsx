import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { Appcontext } from '../../context/AppContext';
import { useEffect } from 'react';
import Navbar from '../../components/HotelOwner/Navbar';
import Sidebar from '../../components/HotelOwner/Sidebar';
import Loader from '../../components/Loader.jsx';
import Footer from '../../components/Footer.jsx'

function Layout() {

  const { isOwner, isOwnerChecked, user, isLoaded, navigate } = useContext(Appcontext);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      navigate("/");
      return;
    }
    if (isOwnerChecked && !isOwner) {
      navigate("/");
    }
  }, [isLoaded, user, isOwnerChecked, isOwner, navigate])

  if (isOwnerChecked && !isOwner) return null;
  if (!isLoaded || (user && !isOwnerChecked)) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 pt-10 pb-2 px-2 md:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout;

