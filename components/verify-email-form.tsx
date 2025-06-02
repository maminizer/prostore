'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// import { FormSuccess } from './auth/form-success';
// import { FormError } from './auth/form-error';
import { newVerification } from '@/lib/actions/new-verification';

const VerifyEmailForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError('No token provided');
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success);
        }
        if (data.error) {
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        setError('An unexpected error occurred');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='text-center'>
        <CardTitle>Confirming now...</CardTitle>
        <CardDescription>Confirming your email address</CardDescription>
      </CardHeader>

      <CardContent>
        <div className='flex items-center w-full justify-center'>
          {!success && !error && <p>Loading</p>}
        </div>
      </CardContent>

      <CardFooter className='flex justify-center'>
        <a
          href='/sign-in'
          className='text-sm text-muted-foreground hover:text-primary underline'
        >
          Back to login
        </a>
      </CardFooter>
    </Card>
  );
};

export default VerifyEmailForm;
