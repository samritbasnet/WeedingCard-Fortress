import React from 'react';
import {Toaster} from 'react-hot-toast'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar/navbar'; // Import the Navbar component
import Landing from '../pages/landing/landing';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Home from '../pages/home/home';
import Home2 from '../pages/home/home2';
import Footer from '../components/footer/footer';
import { Navigate } from 'react-router-dom';

// function App() {

//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Signup />} /> 
//         <Route path= "/home" element={<Home />}/>
//         <Route path= "/home2" element={<Home2 />}/>
//       </Routes>
//       <Footer/>
//       <Toaster
//         position="top-center"
//         reverseOrder={false}
//         gutter={8}
//         containerClassName=""
//         containerStyle={{}}
//         toastOptions={{
//           // Define default options
//           className: '',
//           duration: 5000,
//           style: {
//             background: '#363636',
//             color: '#fff',
//           },

//           // Default options for specific types
//           success: {
//             duration: 5000,
//             theme: {
//               primary: 'green',
//               secondary: 'black',
//             },
//           },
//         }}
//       />
//     </BrowserRouter>
//   );
// }

// 함수형 컴포넌트를 클래스형 컴포넌트로 변경
class App extends React.Component {
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={this.isAuthenticated() ? <Navigate to="/home2" /> : <Login />} />
          <Route path="/register" element={<Signup />} />
          <Route
            path="/home2"
            element={this.isAuthenticated() ? <Home2 /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            // Default options for specific types
            success: {
              duration: 5000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
      </BrowserRouter>
    );
  }
}
export default App;
