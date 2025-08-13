import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/mui-theme";
import store from "./store";

import NavBar from "./components/NavBar";
import CartDrawer from "./components/CartDrawer";
import SiteFooter from "./components/SiteFooter";

import Landing from "./pages/Landing";
import PLP from "./pages/PLP";
import PDP from "./pages/PDP";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderTracking from "./pages/OrderTracking";
import Wishlist from "./pages/Wishlist";
import KidilanTraveller from "./pages/KidilanTraveller";

const RoutedLayout = () => {
  const location = useLocation();
  const isPdp =
    /^\/product\//.test(location.pathname) || location.pathname === "/wishlist";
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/shop" element={<PLP />} />
        <Route path="/product/:id" element={<PDP />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/order/tracking" element={<OrderTracking />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/stories" element={<KidilanTraveller />} />
      </Routes>
      <SiteFooter />
      <CartDrawer />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <RoutedLayout />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
