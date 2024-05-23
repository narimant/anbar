


import './App.css'
import People from './components/people/People';

import 'react-toastify/dist/ReactToastify.css';
import HeaderMenu from './modules/HeaderMenu';
import QuicMenu from './modules/QuicMenu';
import { ToastContainer } from 'react-toastify';
import PeopleCategory from './components/PeopleCategory/PeopleCategory';


function App() {


  return (
    <>
    <div className='w-full h-[calc(100vh-0.5rem)] bg-slate-100'>
    <ToastContainer />
      {/* header main menu */}
     <HeaderMenu />
      
      
      
      {/* header quci menu */}
    <QuicMenu />
      
      {/* main section */}
     <>
     {/* <People /> */}
     <PeopleCategory />
     </>
    </div>
    </>
  )
}

export default App
