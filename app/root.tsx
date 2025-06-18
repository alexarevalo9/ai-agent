import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function HydrateFallback() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6'>
      <div className='max-w-sm w-full space-y-8 text-center'>
        {/* Logo/Brand Area */}
        <div className='space-y-6'>
          <div className='mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg'>
            <svg
              className='w-10 h-10 text-white'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' />
            </svg>
          </div>
          <div className='space-y-2'>
            <h1 className='text-4xl font-bold text-slate-900'>
              AI Financial Coach
            </h1>
            <p className='text-slate-600'>
              Your personalized path to financial wellness
            </p>
          </div>
        </div>

        {/* Loading Animation */}
        <div className='space-y-8'>
          {/* Simple Spinner */}
          <div className='flex justify-center'>
            <div className='w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
          </div>

          {/* Loading Message */}
          <div className='space-y-4'>
            <p className='text-sm text-slate-600'>
              Loading your financial dashboard...
            </p>
          </div>

          {/* Simplified Preview Cards */}
          <div className='grid grid-cols-2 gap-4 opacity-50'>
            <div className='bg-white rounded-xl p-4 shadow-sm border'>
              <div className='h-3 bg-slate-200 rounded mb-3 animate-pulse'></div>
              <div className='h-7 bg-slate-300 rounded mb-2 animate-pulse'></div>
              <div className='h-2 bg-slate-200 rounded w-4/5 animate-pulse'></div>
            </div>
            <div className='bg-white rounded-xl p-4 shadow-sm border'>
              <div className='h-3 bg-slate-200 rounded mb-3 animate-pulse'></div>
              <div className='h-7 bg-slate-300 rounded mb-2 animate-pulse'></div>
              <div className='h-2 bg-slate-200 rounded w-3/5 animate-pulse'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
