import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRouter/AppRouter';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';
function App() {
  console.log(store);
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <AppRouter />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
