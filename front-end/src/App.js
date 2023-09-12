import './assets/css/App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {Home, Login, Register, Account, Questions, Sessions, Users} from './pages'
import Layout from './components/Layout/Layout'
import LayoutLogin from './components/Layout/LayoutLogin'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<LayoutLogin />}>
            <Route path="/account" element={<Account />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
