import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root element
const rootElement = document.getElementById('root');

// Check if the root element exists
if (rootElement) {
  // Create a root
  const root = ReactDOM.createRoot(rootElement);
  
  // Render the App component
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}

reportWebVitals();
