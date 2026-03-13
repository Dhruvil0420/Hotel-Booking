import { useContext } from "react";
import { Appcontext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Loader() {

  const { navigate } = useContext(Appcontext);

  const { nextUrl } = useParams();

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`)
      },8000)
    }
  }, [nextUrl]);

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary'></div>
    </div>
  )
}

export default Loader;
