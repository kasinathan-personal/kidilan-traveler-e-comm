import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RefreshIcon from '@mui/icons-material/Refresh';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { Link } from 'react-router-dom';

const NetworkError = ({ onRetry }) => {
  const handleRefresh = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <Box className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <WifiOffIcon className="text-slate-400 mx-auto mb-4" style={{ fontSize: 64 }} />
        
        <Typography variant="h4" className="font-display mb-2">
          Connection Problem
        </Typography>
        
        <Typography variant="body1" className="text-slate-600 mb-6">
          We're having trouble connecting to our servers. Please check your internet 
          connection and try again.
        </Typography>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Try Again
          </Button>
          
          <Button
            variant="outlined"
            component={Link}
            to="/"
          >
            Go Home
          </Button>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600">
          <Typography variant="body2" className="font-medium mb-2">
            Troubleshooting tips:
          </Typography>
          <ul className="text-left space-y-1">
            <li>• Check your internet connection</li>
            <li>• Try refreshing the page</li>
            <li>• Clear your browser cache</li>
            <li>• Try again in a few minutes</li>
          </ul>
        </div>
      </div>
    </Box>
  );
};

export default NetworkError;