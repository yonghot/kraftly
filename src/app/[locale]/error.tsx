"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50">
          <AlertTriangle className="h-10 w-10 text-red-400" />
        </div>
        <h1 className="mt-6 font-serif text-2xl font-bold tracking-tight text-navy">
          Something went wrong
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          An unexpected error occurred. Please try again or contact support if
          the problem persists.
        </p>
        <Button
          onClick={reset}
          className="mt-8 rounded-xl bg-gold px-6 py-5 text-sm font-semibold text-white shadow-md shadow-gold/20 hover:bg-gold/90"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </motion.div>
    </div>
  );
}
