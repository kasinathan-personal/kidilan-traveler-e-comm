import React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ApiError } from '@/services/api';

const ErrorMessage = ({ error, onRetry, className = '' }) => {
  if (!error) return null;

  const getErrorMessage = (error) => {
    if (error instanceof ApiError) {
      switch (error.status) {
        case 0:
          return 'Unable to connect to the server. Please check your internet connection.';
        case 404:
          return 'The requested resource was not found.';
        case 500:
          return 'Server error occurred. Please try again later.';
        case 429:
          return 'Too many requests. Please wait a moment before trying again.';
        default:
          return error.message || 'An unexpected error occurred.';
      }
    }
    
    return error.message || 'An unexpected error occurred.';
  };

  const getSeverity = (error) => {
    if (error instanceof ApiError) {
      if (error.status === 0) return 'warning';
      if (error.status >= 500) return 'error';
      if (error.status === 404) return 'info';
    }
    return 'error';
  };

  return (
    <Box className={`space-y-3 ${className}`}>
      <Alert 
        severity={getSeverity(error)}
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={onRetry}
            >
              Retry
            </Button>
          )
        }
      >
        {getErrorMessage(error)}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;