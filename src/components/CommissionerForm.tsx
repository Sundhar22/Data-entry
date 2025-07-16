import React, { useState } from 'react';
import { CreateCommissionerSchema } from '@/schemas/commissioner';
import { validateSchema } from '@/lib/validation';
import { z } from 'zod';

type CreateCommissionerData = z.infer<typeof CreateCommissionerSchema>;

interface CommissionerFormProps {
  initialData?: Partial<CreateCommissionerData>;
  onSubmit: (data: CreateCommissionerData) => Promise<void>;
}

export default function CommissionerForm({ initialData, onSubmit }: CommissionerFormProps) {
  const [formData, setFormData] = useState<Partial<CreateCommissionerData>>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    location: initialData?.location || '',
    password: initialData?.password || '',
    commission_rate: initialData?.commission_rate || 0,
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof CreateCommissionerData, value: string | number) => {
    setFormData((prev: Partial<CreateCommissionerData>) => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[field as string]) {
      setErrors(prev => ({
        ...prev,
        [field as string]: []
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate the form data using Zod
    const validation = validateSchema(CreateCommissionerSchema, formData);

    if (!validation.success) {
      setErrors(validation.errors || {});
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(validation.data!);
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({
        _form: ['An error occurred while submitting the form. Please try again.']
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (field: string): string | undefined => {
    return errors[field]?.[0];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            getFieldError('name') ? 'border-red-500' : ''
          }`}
          disabled={isSubmitting}
        />
        {getFieldError('name') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            getFieldError('email') ? 'border-red-500' : ''
          }`}
          disabled={isSubmitting}
        />
        {getFieldError('email') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password || ''}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            getFieldError('password') ? 'border-red-500' : ''
          }`}
          disabled={isSubmitting}
        />
        {getFieldError('password') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('password')}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone || ''}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            getFieldError('phone') ? 'border-red-500' : ''
          }`}
          disabled={isSubmitting}
        />
        {getFieldError('phone') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('phone')}</p>
        )}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={formData.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            getFieldError('location') ? 'border-red-500' : ''
          }`}
          disabled={isSubmitting}
        />
        {getFieldError('location') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('location')}</p>
        )}
      </div>

      <div>
        <label htmlFor="commission_rate" className="block text-sm font-medium text-gray-700">
          Commission Rate (%)
        </label>
        <input
          type="number"
          id="commission_rate"
          step="0.01"
          min="0"
          max="100"
          value={formData.commission_rate || ''}
          onChange={(e) => handleInputChange('commission_rate', parseFloat(e.target.value) || 0)}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            getFieldError('commission_rate') ? 'border-red-500' : ''
          }`}
          disabled={isSubmitting}
        />
        {getFieldError('commission_rate') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('commission_rate')}</p>
        )}
      </div>

      {errors._form && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{errors._form[0]}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
