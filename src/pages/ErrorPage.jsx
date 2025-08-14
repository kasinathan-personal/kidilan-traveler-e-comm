import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorPage = () => {
  const error = useRouteError();

  const getErrorInfo = () => {
    if (error?.status === 404) {
      return {
        title: 'Page Not Found',
        message: "Sorry, we couldn't find the page you're looking for.",
        icon: '🔍'
      };
    }

    if (error?.status >= 500) {
      return {
        title: 'Server Error',
        message: 'Something went wrong on our end. Please try again later.',
        icon: '⚠️'
      };
    }

    return {
      title: 'Something went wrong',
      message: error?.statusText || error?.message || 'An unexpected error occurred.',
      icon: '❌'
    };
  };

  const { title, message, icon } = getErrorInfo();

  return (
    <Box className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="text-6xl mb-4">{icon}</div>
        
        <Typography variant="h3" className="font-display mb-2">
          {title}
        </Typography>
        
        <Typography variant="body1" className="text-slate-600 mb-6">
          {message}
        </Typography>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            component={Link}
            to="/"
          >
            Go Home
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>

        {import.meta.env.DEV && error && (
          <details className="mt-6 text-left bg-slate-50 p-4 rounded-lg">
            <summary className="cursor-pointer text-sm font-medium text-slate-700 mb-2">
              Error Details (Development)
            </summary>
            <pre className="text-xs text-slate-600 overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </Box>
  );
};

export default ErrorPage;