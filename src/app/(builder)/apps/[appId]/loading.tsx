import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full text-indigo-900 animate-in fade-in duration-500">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
        <Loader2 className="w-16 h-16 animate-spin relative z-10 text-indigo-600" />
      </div>
      <h2 className="text-3xl font-black tracking-tight mb-3">Generating your app...</h2>
      <p className="text-indigo-600/70 text-lg font-medium max-w-md text-center">
        Our AI is designing your UI, creating realistic mock data, and assembling the components. This might take a few seconds.
      </p>
    </div>
  );
}
