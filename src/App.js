import logo from './logo.svg';
import './App.css';
import { Toaster } from "react-hot-toast";
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
     <HomePage/>
     <Toaster position="bottom-left" gutter={56} />
    </div>
  );
}

export default App;
