import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './router/app-routes'; // Import the AppRoutes component
import Loader from './components/loader'

import './App.scss';

const App: React.FC = () => {

  return (
    <Loader>
      <Router>
        <div className="App">
          {/* Other components or layout elements */}
          <AppRoutes /> {/* Use the AppRoutes component */}
          {/* Other components or layout elements */}
        </div>
      </Router>
    </Loader>
  );
}

export default App;
