import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

import './styles/style.css';
import './styles/animations.css';
import './styles/responsive.css';
import './styles/pages.css';
import './styles/inner-pages.css';
import './styles/portfolio.css';
import './styles/blog-single.css';
import './styles/experience-education.css';
import './styles/react-additions.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
