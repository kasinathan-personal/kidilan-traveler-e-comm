import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RefreshIcon from '@mui/icons-material/Refresh';
import BugReportIcon from '@mui/icons-material/BugReport';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <BugReportIcon className="text-slate-400 mx-auto mb-4" style={{ fontSize: 64 }} />
            
            <Typography variant="h4" className="font-display mb-2">
              Something went wrong
            </Typography>
            
            <Typography variant="body1" className="text-slate-600 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={this.handleRetry}
              >
                Try Again
              </Button>
              
              <Button
                variant="outlined"
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </Button>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 text-left bg-slate-50 p-4 rounded-lg">
                <summary className="cursor-pointer text-sm font-medium text-slate-700 mb-2">
                  Error Details (Development)
                </summary>
                <pre className="text-xs text-slate-600 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;