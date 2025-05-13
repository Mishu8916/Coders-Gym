import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from "./component/Navbar/Navbar";
import LandingNavbar from './component/Landing_Page/LandingNavbar';
import Landing from './component/Landing_Page/Landing';
import Hero1 from './component/Hero/Hero1';
import About from './component/About/About';
import About2 from './component/About/About2';
import About3 from './component/About/About3';
import Contact from './component/Contact/Contact';
import Pricing from './component/Pricing/Pricing';
import AppStoreBanner from './component/AppStoreBanner/AppStoreBanner';
import Testimonials from './component/Testimonial/Testimonials';
import Footer from './component/Footer/Footer';
import BMI from './component/Bmi/Bmi';
import Register from './component/Register/Register';
import Login from './component/Login/Login';
import OTP from './component/Login/OTP';
import Services from './component/Services/Services';
import Free_Trial_Modal from './component/Landing_Page/Free_Trail_Modal';
import LabTests from './component/Care/LabTests';
import MindfulnessLibrary from './component/Mind/MindFulnessLibrary';
import Fitness from './component/Fitness/Fitness';
import ContactUsForm from './component/Contact/ContactUsForm';
import Profile from './component/Profile/Profile';
import ForgotPassword from './component/Forgot_Password/ForgotPassword';
import BlogPage from './component/Blog/BlogPage';
import GymToDoList from './component/Task/GymToDoList';
import HealthCheckup from './component/Care/HealthCheckup';
import TravelMatch from './component/TravelMatch/TravelMatch';
import TravelChat from './component/Travel-Chat/TravelChat';
import FloatingIcons from './component/FloatingIcons/FloatingIcons';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';
import ChatBot from './component/ChatBot/ChatBot';
import PaymentPage from './component/Payment/PaymentPage';
// Layout component that includes the appropriate navbar
const Layout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="h-screen overflow-y-auto hide-scrollbar bg-white dark:bg-black dark:text-white">
      {isAuthenticated ? <LandingNavbar /> : <Navbar />}
      <div className={isAuthenticated ? "" : "pt-16"}> {/* Only add padding for non-authenticated pages */}
        <Outlet />
      </div>
      {isAuthenticated && <FloatingIcons />}
    </div>
  );
};

const AppContent = () => {
  // Public routes available to all users
  const publicRoutes = [
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
         <BMI/>
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
      path: "/forgotpassword",
      element: <ForgotPassword />,
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/payment",
      element: <PaymentPage />
    },
    {
      path: "/healthcheckup/:id",
      element: <HealthCheckup />,
    }
  ];

  // Protected routes only available to authenticated users
  const protectedRoutes = [
    {
      path: "/landing",
      element: <Landing />, // Changed to use Landing component
    },
    {
      path: "/auth/services", // New protected services route
      element: <Services />,
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
      path: "/fit",
      element: <Fitness />,
    },
    {
      path: "/contact_us",
      element: <ContactUsForm />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/blogpage",
      element: <BlogPage />
    },
    {
      path: "/todolist",
      element: <GymToDoList />
    },
    {
      path: "/travel-match",
      element: <TravelMatch />
    },
    {
      path: "/travel-chat",
      element: <TravelChat />
    }
  ];

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        ...publicRoutes,
        ...protectedRoutes.map(route => ({
          ...route,
          element: <ProtectedRoute>{route.element}</ProtectedRoute>
        }))
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export const App = () => {
  return (
    <AuthProvider>
      <AppContent />
      <ChatBot />
    </AuthProvider>
  );
};

export default App;