import { Login } from './Views/Login'
import { Home } from "./Views/Home"
import { Cart } from './Views/Cart';
import { Compras } from './Views/Compras';
import './styles/App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const routerDom = createBrowserRouter ( [
  { 
    path: '/',
    element: <Login/>,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/compras',
    element: <Compras />,
  },
]);

function App() {
  return (
    <RouterProvider router={routerDom}/>
  )
}

export default App
