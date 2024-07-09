import "./App.css";
import Nav from "./nav";

import { BrowserRouter,Route,Routes,useParams } from 'react-router-dom'
import PackageListPage from "./component/packagelist";
import AddPackagePage from "./component/addpackage";
import EditPackage from "./component/editpackage";

function App() {
  return <>
<<<<<<< HEAD
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav/>}/>
        <Route path="/package/add" element={<AddPackagePage/>}/>
        <Route path="/package/view" element={<PackageListPage/>}/>

        {/* <Route path="/page" element={<Page />} /> */}
      </Routes>
      </BrowserRouter>


=======
  <EditPackage/>
>>>>>>> 019cc7a (feat: admin page done 80% in 3 page with list, create and edit)
  </>;
}

export default App;
