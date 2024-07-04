import { useAuth,AuthProvider } from './auth.js';
import "./App.css"
import AppContent from "./AppContent.js"
import axios from 'axios';
import { Provider } from 'react-redux';
import store from "../src/state/store.js"

axios.defaults.withCredentials = true;

function App() {

  return (
    <Provider store={store}>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
    </Provider>
  );
}

export default App;
