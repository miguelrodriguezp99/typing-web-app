import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <BrowserRouter>
    <AuthContextProvider>
      <Layout>
        <App />
      </Layout>
    </AuthContextProvider>
  </BrowserRouter>
);

