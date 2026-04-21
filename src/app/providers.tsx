'use client';

import { DemoProvider } from '../lib/demo-store';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <DemoProvider>{children}</DemoProvider>;
}
