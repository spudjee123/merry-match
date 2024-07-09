import "./App.css";
import Nav from "./nav";

import { BrowserRouter,Route,Routes,useParams } from 'react-router-dom'
import PackageListPage from "./component/packagelist";
import AddPackagePage from "./component/addpackage";
import EditPackage from "./component/editpackage";

function App() {
  return <>

   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav/>}/>
        <Route path="/package/add" element={<AddPackagePage/>}/>
        <Route path="/package/view" element={<PackageListPage/>}/>

        {/* <Route path="/page" element={<Page />} /> */}
      </Routes>
      </BrowserRouter>


  </>;
}

export default App;
