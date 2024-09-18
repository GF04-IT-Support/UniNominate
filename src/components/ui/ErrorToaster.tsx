// src/components/common/ErrorToaster.tsx
"use client";

import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

const ErrorToaster = ({ error }: { error: string }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (error) {
      toast.error(decodeURIComponent(error),{
        id:error
      });
    }
  }, [error]);

  return null;
};

export default ErrorToaster;