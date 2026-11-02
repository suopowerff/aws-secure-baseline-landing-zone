import './globals.css';
import React from 'react';

export const metadata = {
  title: 'AWS Secure Landing Zone Posture',
  description: 'Real-time AWS Security Baseline & GDPR Region Lock Status',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
