import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Overview from './pages/overview/Overview';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Cards from './pages/overview/cards';
import Pauta from './pages/pauta/Pauta';

function App() {
  return (
    <Router>

      <Topbar/>
      <div style={{display:'flex'}}>
        <Sidebar/>
        <Overview/>
        {/* <Cards/> */}
        {/* <Pauta/> */}
      </div>

      


     

    </Router>
  )

}



export default App;
