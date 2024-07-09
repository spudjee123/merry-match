import "./App.css";
import Nav from "./nav";
import { BrowserRouter,Route,Routes,useParams } from 'react-router-dom'

function App() {
  return <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav/>}/>

        {/* <Route path="/page" element={<Page />} /> */}
      </Routes>
      </BrowserRouter>
  </>;
}

export default App;
