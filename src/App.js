import logo from './logo.svg';
import './App.css';
import Navbar from './Nav/navbar';
import SignUp from './SignUp/signup';
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectPlan from './PlanSelect/SelectPlan';
import Homepage from './Home/HomePage';

function App() {
  
  return (
      <Router>
    <div className="App">

      <ChakraProvider>
      <Navbar />
      <Routes>
          {/* Using /signin as the single Register flow per request - SignIn component remains but /signin now renders registration UI (Register) */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Register />} />
          <Route path="/selectPlan" element={<SelectPlan />} />
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/selectPlan/stage1" element={<Stage1 />} />
          <Route path="/selectPlan/stage2" element={<Stage2 />} /> */}
      </Routes>
      </ChakraProvider>

    </div>
      </Router>
  );
}

export default App;
