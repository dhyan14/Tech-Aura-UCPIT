'use client';

import { useState, useEffect } from 'react';

export function DynamicYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span>{year || '2024'}</span>;
}
