import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';

const SiteFooter = () => {
  return (
    <footer className="bg-slate-50 text-slate-700 mt-16 border-t border-slate-100">
      <div className="container max-w-7xl mx-auto py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="font-display text-2xl text-slate-900">Kidilan Traveler</div>
          <p className="mt-3 text-sm text-slate-600">Premium travel gear designed for explorers. Built to endure. Designed to inspire.</p>
          <div className="mt-4 flex gap-2">
            <IconButton size="small" aria-label="instagram"><InstagramIcon fontSize="small" /></IconButton>
            <IconButton size="small" aria-label="twitter"><TwitterIcon fontSize="small" /></IconButton>
            <IconButton size="small" aria-label="youtube"><YouTubeIcon fontSize="small" /></IconButton>
            <IconButton size="small" aria-label="facebook"><FacebookIcon fontSize="small" /></IconButton>
          </div>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-3">Shop</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop?category=backpacks" className="hover:text-slate-900">Backpacks</Link></li>
            <li><Link to="/shop?category=apparel" className="hover:text-slate-900">Apparel</Link></li>
            <li><Link to="/shop?category=tech" className="hover:text-slate-900">Travel Tech</Link></li>
            <li><Link to="/shop?category=souvenirs" className="hover:text-slate-900">Souvenirs</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-3">Support</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/order/tracking" className="hover:text-slate-900">Order Tracking</Link></li>
            <li><Link to="/checkout" className="hover:text-slate-900">Returns & Shipping</Link></li>
            <li><a className="hover:text-slate-900" href="#">Warranty</a></li>
            <li><a className="hover:text-slate-900" href="#">FAQ</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-3">Contact</div>
          <ul className="space-y-2 text-sm">
            <li>Email: support@kidilantraveler.com</li>
            <li>Mon–Fri: 9am–6pm</li>
            <li>Los Angeles, CA</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="container max-w-7xl mx-auto py-4 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Kidilan Traveler. All rights reserved.</div>
          <div className="flex gap-4">
            <a className="hover:text-slate-700" href="#">Privacy</a>
            <a className="hover:text-slate-700" href="#">Terms</a>
            <a className="hover:text-slate-700" href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter; 