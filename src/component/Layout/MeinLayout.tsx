import Header from "./header/Header.tsx";
import WebRouter from "../../router/WebRouter.tsx";
// import BottomNav from "./BottomNav.tsx";
import {useLocation} from "react-router-dom";
import {Paths} from "../../router/paths.tsx";


const MeinLayout = () => {

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className='w-full md:pr-[295px] '>
        <div className='m-1.5'>
          <Header/>
        </div>
        <div className={` ${currentPath === Paths.home ? '' : 'max-md:pb-32'} `}>
          <WebRouter/>
        </div>
        {/*<BottomNav/>*/}
      </div>
    </>
  );
};

export default MeinLayout;