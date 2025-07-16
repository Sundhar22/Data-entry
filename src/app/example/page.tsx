'use client';

import CommissionerForm from '@/components/CommissionerForm';
import { z } from 'zod';
import { CreateCommissionerSchema } from '@/schemas/commissioner';

export default function ExamplePage() {
  const handleSubmit = async (data: z.infer<typeof CreateCommissionerSchema>) => {
    console.log('Form submitted:', data);
    // Here you would typically send the data to your API
    // For example:
    // const response = await fetch('/api/commissioner', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Commissioner Form Example</h1>
      <CommissionerForm onSubmit={handleSubmit} />
    </div>
  );
}
