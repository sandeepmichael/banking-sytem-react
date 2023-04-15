import './App.css';
import Navbarcomponent from './components/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/homePage';
import AddUser from './components/addUser';
import ViewUser from './components/viewUsers';
import ViewTransfer from './components/view&Transfer';
import HistoryPage from './components/historyPage';

function App() {
  return (
    <div>
       <Navbarcomponent />
       <BrowserRouter>
        <Routes>
           <Route path='/' element={<Home />} exact />
           <Route path='/adduser' element={<AddUser />}exact />
           <Route path='/viewuser' element={<ViewUser />}  exact/>
           <Route path='/view/:id' element={<ViewTransfer />} exact />
           <Route path='/history' element={<HistoryPage />}/>
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
