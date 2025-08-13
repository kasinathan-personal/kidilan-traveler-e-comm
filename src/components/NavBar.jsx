import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BookIcon from "@mui/icons-material/Book";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/store/slices/uiSlice";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const itemCount = useSelector((s) =>
    s.cart.items.reduce((n, i) => n + i.quantity, 0)
  );
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const [isSolid, setIsSolid] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setIsSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when route changes
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navigationItems = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "Shop", path: "/shop", icon: <StorefrontIcon /> },
    { label: "Stories", path: "/stories", icon: <BookIcon /> },
    {
      label: "Track Order",
      path: "/order/tracking",
      icon: <LocalShippingIcon />,
    },
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        className={`${
          isSolid ? "bg-white/95" : "bg-white/80"
        } transition-all duration-300 backdrop-blur-md text-slate-800 shadow-sm border-b border-white/20`}
        elevation={0}
      >
        <Toolbar className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full">
            {/* Left side - Mobile menu + Logo + Desktop nav */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile menu button */}
              <IconButton
                color="inherit"
                edge="start"
                className="lg:hidden p-2"
                onClick={handleMobileMenuToggle}
                aria-label="open menu"
              >
                <MenuIcon />
              </IconButton>

              {/* Logo */}
              <Link
                to="/"
                className="font-display text-lg sm:text-xl lg:text-2xl text-slate-900 hover:text-slate-700 transition-colors whitespace-nowrap"
              >
                <span className="hidden sm:inline">Kidilan Traveler</span>
                <span className="sm:hidden">Kidilan</span>
              </Link>

              {/* Desktop navigation */}
              <nav className="hidden lg:flex items-center gap-6 ml-8">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-slate-900 font-medium"
                          : "text-slate-600"
                      } hover:text-slate-900 transition-colors duration-200 py-2 px-1 relative`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Right side - Action buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <IconButton
                color="inherit"
                onClick={() => navigate("/wishlist")}
                aria-label="wishlist"
                className="p-2 hover:bg-slate-100/50 transition-colors"
                size="medium"
              >
                <FavoriteBorderIcon fontSize="small" />
              </IconButton>

              <IconButton
                color="inherit"
                onClick={() => dispatch(toggleCart(true))}
                aria-label="cart"
                className="p-2 hover:bg-slate-100/50 transition-colors"
                size="medium"
              >
                <Badge
                  color="primary"
                  badgeContent={itemCount}
                  max={99}
                  className="[&_.MuiBadge-badge]:text-xs [&_.MuiBadge-badge]:min-w-[18px] [&_.MuiBadge-badge]:h-[18px]"
                >
                  <ShoppingBagIcon fontSize="small" />
                </Badge>
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
      >
        <Box sx={{ width: 280 }} role="presentation">
          <div className="flex flex-col h-full bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <Link
                to="/"
                className="font-display text-xl text-slate-900 no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kidilan Traveler
              </Link>
              <IconButton
                onClick={() => setMobileMenuOpen(false)}
                size="small"
                aria-label="close menu"
                className="text-slate-600 hover:text-slate-900"
              >
                <CloseIcon />
              </IconButton>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 py-4">
              <List className="px-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <ListItem key={item.path} disablePadding className="mb-1">
                      <ListItemButton
                        onClick={() => handleNavigation(item.path)}
                        color={isActive ? "text-primary" : "inherit"}
                        className="rounded-lg px-4 py-3 transition-all duration-200 hover:bg-slate-50"
                      >
                        <ListItemIcon
                          className={`min-w-10 ${
                            isActive ? "text-primary" : "text-slate-500"
                          }`}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            className: `${
                              isActive
                                ? "font-semibold text-primary"
                                : "font-medium"
                            } text-base`,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>

              <Divider className="my-6 mx-4" />

              {/* Mobile action items */}
            </div>

            {/* Footer */}
            <div className="mt-auto p-4 border-t border-slate-200 bg-slate-50">
              <p className="text-slate-500 text-sm text-center">
                © 2025 Kidilan Traveler
              </p>
            </div>
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
