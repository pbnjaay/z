import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <div id="main">
        <Outlet></Outlet>
      </div>
    </>
  );
}
export default App;
