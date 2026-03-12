import { Outlet } from 'react-router-dom';
import Navbar from '../../components/HotelOwner/navbar';
import Sidebar from '../../components/HotelOwner/Sidebar';
import { useContext } from 'react';
import { Appcontext } from '../../context/AppContext';
import { useEffect } from 'react';
import Loading from '../../components/Loading';

function Layout () {
  
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
    return <Loading />;
  }

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className='flex h-full'>
        <Sidebar />
        <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout;

