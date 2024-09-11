import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authreducer/action';
import { Toast, useToast } from '@chakra-ui/react';
import Navbar2 from '../components/Navbar2';
import Footer from './Footer';

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const toast = useToast()
  const { isAuth, errorMsg, token, loggedInUser } = useSelector(store => store.authReducer)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { email, password }
    dispatch(login(userData))
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    // localStorage.setItem('ch-token', JSON.stringify({loggedInUser, token}));
    if (token) {
      toast({
        description: "User login successful",
        status: 'success',
        isClosable: true,
        duration: 4000,
        position: 'top'
      })

      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 4000)
    } else if (errorMsg) {
      toast({
        description: errorMsg,
        status: 'error',
        isClosable: true,
        duration: 4000,
        position: 'top'
      })
    }
  }, [isAuth, errorMsg, token])

  useEffect(() => {
    window.scrollTo({top : 0, left : 0, behavior : 'smooth'});
 }, [])

  return (
    <div>
      <Navbar2/>
      <div className='background'>
        {/* <img width={"100%"} src="https://plus.unsplash.com/premium_photo-1661963873162-5028faa8ce36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGRvbmF0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="" /> */}
      </div>

      <div className='signup-page'>
        <div className='signup-detail'>
          <h1>Give Your life to charity<br /></h1>
          <img width={"100%"} src="https://media.istockphoto.com/id/1353332258/photo/donation-concept-the-volunteer-giving-a-donate-box-to-the-recipient-standing-against-the-wall.webp?b=1&s=170667a&w=0&k=20&c=D53dy4HPlfLi9yCO8ouowIn9HqIWfkjEx4-C05B8TYU=" alt="" />

        </div>
        <form onSubmit={handleLogin} className='signup'>
          <h1><span>DONATION</span>  <span> Login</span></h1>

          <br />
          <label >Email</label>
          <input type="text" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <br />
          <label >Password</label>
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <br />
          <button type="submit" >Login</button>          <span>Don't have an account ? <Link className='log-btn' to='/users/register'>SignUp</Link> </span>

        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default LoginPage

// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../redux/authreducer/action';
// import { useToast } from '@chakra-ui/react';
// import Navbar2 from '../components/Navbar2';
// import Footer from './Footer';
// import '../styles/login.css';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const toast = useToast();
  
//   const { isAuth, errorMsg, token, loggedInUser } = useSelector(store => store.authReducer);
  
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast({
//         description: "Please fill in all fields.",
//         status: 'warning',
//         isClosable: true,
//         duration: 4000,
//         position: 'top'
//       });
//       return;
//     }

//     const userData = { email, password };
//     dispatch(login(userData));

//     setEmail('');
//     setPassword('');
//   }

//   useEffect(() => {
//     if (token) {
//       toast({
//         description: "User login successful",
//         status: 'success',
//         isClosable: true,
//         duration: 4000,
//         position: 'top'
//       });

//       setTimeout(() => {
//         navigate('/');
//       }, 4000);
//     } else if (errorMsg) {
//       toast({
//         description: errorMsg,
//         status: 'error',
//         isClosable: true,
//         duration: 4000,
//         position: 'top'
//       });
//     }
//   }, [token, errorMsg, toast, navigate]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
//   }, []);

//   return (
//     <div>
//       <Navbar2 />
//       <div className='background'>
//         {/* Background Image Here */}
//       </div>

//       <div className='signup-page'>
//         <div className='signup-detail'>
//           <h1>Give Your Life to Charity<br /></h1>
//           <img 
//             width={"100%"} 
//             src="https://media.istockphoto.com/id/1353332258/photo/donation-concept-the-volunteer-giving-a-donate-box-to-the-recipient-standing-against-the-wall.webp?b=1&s=170667a&w=0&k=20&c=D53dy4HPlfLi9yCO8ouowIn9HqIWfkjEx4-C05B8TYU=" 
//             alt="Donation" 
//           />
//         </div>

//         <form onSubmit={handleLogin} className='signup'>
//           <h1><span>DONATION</span> <span> Login</span></h1>

//           <br />
//           <label>Email</label>
//           <input 
//             type="text" 
//             placeholder='Enter your email' 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//           <br />
//           <label>Password</label>
//           <input 
//             type="password" 
//             placeholder='Password' 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//           <br />
//           <button type="submit">Login</button>
//           <span>Don't have an account? <Link className='log-btn' to='/users/register'>Sign Up</Link></span>
//         </form>
//       </div>
      
//       <Footer />
//     </div>
//   );
// }

// export default LoginPage;
