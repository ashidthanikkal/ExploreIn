import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Landing from './pages/Landing';
import Home from './pages/Home';
import SingleView from './pages/SingleView';

function App() {
  return (
    <div className="App">

      <Header></Header>

     <Routes> 
      <Route path='/' element={<Landing></Landing>}></Route>
      <Route path='/home' element={<Home></Home>}></Route>
      <Route path='/single_view/:id' element={<SingleView></SingleView>}></Route>

      </Routes>

    </div>
  );
}

export default App;
