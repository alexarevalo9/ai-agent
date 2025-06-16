import { useState } from 'react';
import { mastraClient } from '../../lib/mastra';

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const city = formData.get('city')?.toString();
    const agent = mastraClient.getAgent('weatherAgent');

    try {
      const response = await agent.generate({
        messages: [
          { role: 'user', content: `What's the weather like in ${city}?` },
        ],
      });

      setResult(response.text);
    } catch (error) {
      setResult(
        'Sorry, there was an error getting the weather information. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500'>
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-2xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-12'>
            <h1 className='text-5xl font-bold text-white mb-4 drop-shadow-lg'>
              Weather Assistant
            </h1>
            <p className='text-xl text-white/90 drop-shadow'>
              Get instant weather information for any city worldwide
            </p>
          </div>

          {/* Main Card */}
          <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='space-y-2'>
                <label
                  htmlFor='city'
                  className='block text-white font-semibold text-lg'
                >
                  Enter City Name
                </label>
                <div className='relative'>
                  <input
                    id='city'
                    name='city'
                    type='text'
                    placeholder='e.g., New York, London, Tokyo...'
                    required
                    disabled={loading}
                    className='w-full px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 
                             text-white placeholder-white/70 text-lg focus:outline-none focus:ring-4 
                             focus:ring-white/50 focus:border-white/50 transition-all duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed'
                  />
                  <div className='absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none'>
                    <svg
                      className='w-6 h-6 text-white/70'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full py-4 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 
                         hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg 
                         rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] 
                         transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed 
                         disabled:transform-none focus:outline-none focus:ring-4 focus:ring-purple-500/50'
              >
                {loading ? (
                  <div className='flex items-center justify-center space-x-3'>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-6 w-6 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    <span>Getting Weather...</span>
                  </div>
                ) : (
                  <div className='flex items-center justify-center space-x-3'>
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
                      />
                    </svg>
                    <span>Get Weather</span>
                  </div>
                )}
              </button>
            </form>

            {/* Results */}
            {result && (
              <div className='mt-8 p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30'>
                <h3 className='text-white font-bold text-xl mb-4 flex items-center'>
                  <svg
                    className='w-6 h-6 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  Weather Information
                </h3>
                <div className='text-white/90 leading-relaxed whitespace-pre-wrap text-lg'>
                  {result}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className='text-center mt-12'>
            <p className='text-white/80 text-sm'>
              Powered by AI Weather Assistant
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
