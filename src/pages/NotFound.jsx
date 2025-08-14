import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ImageWithFallback from '@/components/ImageWithFallback';

const NotFound = () => {
  return (
    <Box className="min-h-screen bg-white">
      <div className="container max-w-4xl mx-auto py-16 text-center">
        <div className="relative mb-8">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=1200&auto=format&fit=crop"
            alt="Lost traveler"
            className="w-full max-w-md mx-auto h-64 object-cover rounded-2xl opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Typography variant="h1" className="font-display text-8xl text-slate-900/20">
              404
            </Typography>
          </div>
        </div>

        <Typography variant="h2" className="font-display mb-4">
          Looks like you're off the beaten path
        </Typography>
        
        <Typography variant="body1" className="text-slate-600 mb-8 max-w-2xl mx-auto">
          The page you're looking for doesn't exist. It might have been moved, deleted, 
          or you entered the wrong URL. Let's get you back on track.
        </Typography>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
            component={Link}
            to="/"
          >
            Back to Home
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            startIcon={<SearchIcon />}
            component={Link}
            to="/shop"
          >
            Browse Products
          </Button>
        </div>

        {/* Popular links */}
        <div className="bg-slate-50 rounded-2xl p-6">
          <Typography variant="h6" className="font-display mb-4">
            Popular Destinations
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Backpacks', path: '/shop?category=backpacks' },
              { label: 'Travel Tech', path: '/shop?category=tech' },
              { label: 'Apparel', path: '/shop?category=apparel' },
              { label: 'Souvenirs', path: '/shop?category=souvenirs' }
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default NotFound;