import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent 3rd-party cross-origin ad network script errors from breaking the application
window.addEventListener('error', (event) => {
  if (
    event.message === 'Script error.' ||
    (event.filename && event.filename.includes('highrevenueformat')) ||
    (event.target && (event.target as HTMLElement).tagName === 'SCRIPT')
  ) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return true;
  }
}, true);

window.onerror = (message, source) => {
  if (
    message === 'Script error.' ||
    (typeof source === 'string' && source.includes('highrevenueformat'))
  ) {
    return true;
  }
  return false;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
