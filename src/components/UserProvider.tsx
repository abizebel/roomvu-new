'use client';

import { UserProvider as Auth0UserProvider } from '@auth0/nextjs-auth0/client';
import { ReactNode } from 'react';

export default function UserProvider({ children }: { children: ReactNode }) {
  return <Auth0UserProvider>{children}</Auth0UserProvider>;
} 