import SEO from '@/components/SEO/SEO';
import router from '@/config/router';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router';

function App() {
  return (
    <HelmetProvider>
      <SEO />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}

export default App;
