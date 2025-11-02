// Loading state for the app
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="text-center">
        {/* Optimized spinner */}
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" 
             role="status"
             aria-label="Loading">
        </div>
        <p className="mt-4 text-lg text-white">Loading...</p>
      </div>
    </div>
  );
}
