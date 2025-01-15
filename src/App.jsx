import React from 'react'
import Navbar from "./component/Navbar/Navbar"
// import Hero from './component/Hero/Hero'
import Hero1 from './component/Hero/Hero1'
import About from './component/About/About'
import About2 from './component/About/About2'
import About3 from './component/About/About3'
import Contact from './component/Contact/Contact'
import Pricing from './component/Pricing/pricing'
import AppStoreBanner from './component/AppStoreBanner/AppStoreBanner'
import Testimonials from './component/Testimonial/Testimonials'
import Footer from './component/Footer/Footer'
import Bmi from './component/BMI/Bmi'
import Login from './component/Login/Login'
import Login1 from './component/Login/Login1'
import OTP from './component/Login/OTP'
import Services from './component/Services/Services'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' // importing the react router dom 
export const App = () => {
  // react router dom consist of the array of routes {} and path/field element 
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/login1",
      element: <Login1 />
    },
    {
      path: "/otp",
      element: <OTP />
    }
    ,{
      path:'/services',
      element:<Services/>
    }
  ])

  return (
    <div className='overflow-x-hidden bg-white dark:bg-black dark:text-white text-black'>

      <Navbar />
      {/* <Hero/> */}
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
      {/* route returns webpage on click  */}
      <RouterProvider router={router} />
    </div>
  )
}
export default App;  
