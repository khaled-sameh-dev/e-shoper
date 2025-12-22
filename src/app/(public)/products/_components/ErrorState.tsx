import { Button } from "@/components/ui/button";

const ErrorState = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <svg
      className="w-24 h-24 text-red-300 mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Oops! Something went wrong
    </h3>
    <p className="text-gray-500 text-center max-w-md mb-4">{error}</p>
    <Button onClick={onRetry} className="px-6 py-2">
      Try Again
    </Button>
  </div>
);

export default ErrorState