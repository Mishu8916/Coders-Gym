import React from 'react';
import Navbar from "./component/Navbar/Navbar";
import LandingNavbar from './component/Landing_Page/LandingNavbar';
// import Hero from './component/Hero/Hero'
import Hero1 from './component/Hero/Hero1';
import About from './component/About/About';
import About2 from './component/About/About2';
import About3 from './component/About/About3';
import Contact from './component/Contact/Contact';
import Pricing from './component/Pricing/pricing';
import AppStoreBanner from './component/AppStoreBanner/AppStoreBanner';
import Testimonials from './component/Testimonial/Testimonials';
import Footer from './component/Footer/Footer';
import Bmi from './component/BMI/Bmi';
import Register from './component/Register/Register';
import Login from './component/Login/Login';
import OTP from './component/Login/OTP';
import Services from './component/Services/Services';
import Free_Trial_Modal from './component/Landing_Page/Free_Trail_Modal';
import LabTests from './component/Care/LabTests';
import MindfulnessLibrary from './component/Mind/MindFulnessLibrary';
import Fitness from './component/Fitness/Fitness';
import ContactUsForm from './component/Contact/ContactUsForm';
import Profile from'./component/Profile/Profile'
import ForgotPassword from './component/Forgot_Password/forgotpassword';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const App = () => {
  // Updated routing configuration with a default route
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Hero1 />
          <About />
          <About2 />
          <About3 />
          <Contact />
          <Pricing />
          <AppStoreBanner />
          <Testimonials />
          <Bmi />
          <Footer />
        </>
      ),
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/otp",
      element: <OTP />,
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/landing",
      element: <LandingNavbar />,
    },
    {
      path: "/free_trail_modal",
      element: <Free_Trial_Modal />,
    },
    {
      path: "/Labtests",
      element: <LabTests />,
    },
    {
      path: "/mind",
      element: <MindfulnessLibrary />,
    },
    {
      path:"/fit",
      element:<Fitness/>,
    },
    {
      path:"/contact_us",
      element:<ContactUsForm/>,
    },
    {
      path:"/profile",
      element:<Profile/>,
    },
    {
      path:"/forgotpassword",
      element:<ForgotPassword/>,
    },
     ]);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-black dark:text-white text-black">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
