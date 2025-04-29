import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion }   from "framer-motion";

import Header       from "./Components/Helper/Header";
import Footer       from "./Components/Helper/Footer";
import PrivateRoute from "./Components/Helper/PrivateRoute";

import Home           from "./Components/Pages/Home/Home";
import Login          from "./Components/Pages/Login/Login";
import Register       from "./Components/Pages/Register/Register";
import ResetPassword  from "./Components/Pages/Login/ResetPassword";
import HelpAndSupport from "./Components/Pages/HelpAndSupport/HnS_Page";
import AboutUs        from "./Components/Pages/AboutUs/AboutUs";
import Profile        from "./Components/Pages/Profile/Profile";
import Logout         from "./Components/Pages/Login/Logout";

// Stub components for pages you haven’t built yet:
const ComingSoonGetRec = () => (
  <div style={{ padding: 40, textAlign: 'center' }}>
    <h2>Get Recommendation Coming Soon!</h2>
  </div>
);
const ComingSoonFeatures = () => (
  <div style={{ padding: 40, textAlign: 'center' }}>
    <h2>Features Coming Soon!</h2>
  </div>
);

function App() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, x: "-100vw" },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: "100vw" }
  };
  const pageTransition = { duration: 0.5, ease: "easeInOut" };

  const wrap = (Comp) => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <Comp />
    </motion.div>
  );

  return (
    <>
      <Header />

      <div className="page-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public */}
            <Route path="/"               element={wrap(Home)} />
            <Route path="/login"          element={wrap(Login)} />
            <Route path="/register"       element={wrap(Register)} />
            <Route path="/reset-password" element={wrap(ResetPassword)} />
            <Route path="/getrec_pg1"     element={wrap(ComingSoonGetRec)} />
            <Route path="/features"       element={wrap(ComingSoonFeatures)} />
            <Route path="/help-support"   element={wrap(HelpAndSupport)} />
            <Route path="/aboutus"        element={wrap(AboutUs)} />

            {/* Logout clears state & redirects to login */}
            <Route path="/logout" element={<Logout />} />

            {/* Protected */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  {wrap(Profile)}
                </PrivateRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer />
    </>
  );
}

export default App;
