import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LoadingSpinner = ({ 
  size = 40, 
  message = 'Loading...', 
  fullScreen = false,
  className = '' 
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" className="text-slate-600">
          {message}
        </Typography>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <Box className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </Box>
    );
  }

  return (
    <Box className={`flex items-center justify-center p-8 ${className}`}>
      {content}
    </Box>
  );
};

export default LoadingSpinner;