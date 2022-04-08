import './App.css';
import './assests/font/THICCCBOI-Regular.ttf';

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Registration from "./pages/Registration/Registration"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Registration/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
