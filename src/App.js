import './App.css';
import Search from './Components/Searchpage';
import { BrowserRouter, Routes, Route } from "react-router-dom";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route eaxct path="/" Component={Search} />
      
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
