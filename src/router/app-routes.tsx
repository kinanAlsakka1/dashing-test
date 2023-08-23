// App.tsx
import React , { Suspense, lazy } from 'react';
import {Route, Routes , Navigate} from 'react-router-dom';
import PrivateRoute from './private-route';

const Login = lazy(() => import('../pages/login'));
const Home = lazy(() => import('../pages/home'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={
      <div className='spinner-countainer'>
            loading
            <div className="spinner"></div>
      </div>
      }>
        <Routes>
          <Route path="/" element={<PrivateRoute roles={['Editor' , 'Viewer']} page={<Home/>}/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
     </Suspense>
  );
};


export default AppRoutes;
