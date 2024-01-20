import { useRoutes } from 'react-router-dom'
import Protected from './pages/Protected';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboad from './pages/Dashboad';


const App = () => {
  const routes = useRoutes([
    {
      path: '/signin',
      element : <Signin/>
    },
    {
      path: '/signup',
      element : <Signup/>
    },
    {
      path: '/',
      element : <Protected>
        <Dashboad/>
      </Protected>
    },
  ])
  return routes
};

export default App;
