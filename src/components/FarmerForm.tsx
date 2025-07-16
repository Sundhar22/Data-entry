'use client';

import React, { useState, useEffect } from 'react';
import { CreateFarmerSchema } from '@/schemas/farmer';
import { validateSchema } from '@/lib/validation';
import { z } from 'zod';

type CreateFarmerData = z.infer<typeof CreateFarmerSchema>;

interface FarmerFormProps {
  initialData?: Partial<CreateFarmerData>;
  onSubmit: (data: CreateFarmerData) => Promise<void>;
}

interface Commissioner {
  id: string;
  name: string;
  location: string;
}

export default function FarmerForm({ initialData, onSubmit }: FarmerFormProps) {
  const [formData, setFormData] = useState<Partial<CreateFarmerData>>({
    name: initialData?.name || '',
    phone: initialData?.phone || '',
    village: initialData?.village || '',
    commissioner_id: initialData?.commissioner_id || '',
    is_active: initialData?.is_active ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commissioners, setCommissioners] = useState<Commissioner[]>([]);
  const [loadingCommissioners, setLoadingCommissioners] = useState(true);

  // Fetch commissioners on component mount
  useEffect(() => {
    const fetchCommissioners = async () => {
      try {
        const response = await fetch('/api/commissioner');
        if (response.ok) {
          const data = await response.json();
          setCommissioners(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching commissioners:', error);
      } finally {
        setLoadingCommissioners(false);
      }
    };

    fetchCommissioners();
  }, []);

  const handleInputChange = (field: keyof CreateFarmerData, value: string | boolean) => {
    setFormData((prev: Partial<CreateFarmerData>) => ({
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
    const validation = validateSchema(CreateFarmerSchema, formData);

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
          Name *
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
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone *
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
          placeholder="10 digit phone number"
        />
        {getFieldError('phone') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('phone')}</p>
        )}
      </div>

      <div>
        <label htmlFor="village" className="block text-sm font-medium text-gray-700">
          Village *
        </label>
        <input
          type="text"
          id="village"
          value={formData.village || ''}
          onChange={(e) => handleInputChange('village', e.target.value)}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            getFieldError('village') ? 'border-red-500' : ''
          }`}
          disabled={isSubmitting}
        />
        {getFieldError('village') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('village')}</p>
        )}
      </div>

      <div>
        <label htmlFor="commissioner_id" className="block text-sm font-medium text-gray-700">
          Commissioner *
        </label>
        <select
          id="commissioner_id"
          value={formData.commissioner_id || ''}
          onChange={(e) => handleInputChange('commissioner_id', e.target.value)}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            getFieldError('commissioner_id') ? 'border-red-500' : ''
          }`}
          disabled={isSubmitting || loadingCommissioners}
        >
          <option value="">Select a commissioner</option>
          {commissioners.map((commissioner) => (
            <option key={commissioner.id} value={commissioner.id}>
              {commissioner.name} - {commissioner.location}
            </option>
          ))}
        </select>
        {getFieldError('commissioner_id') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('commissioner_id')}</p>
        )}
        {loadingCommissioners && (
          <p className="mt-1 text-sm text-gray-500">Loading commissioners...</p>
        )}
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.is_active || false}
            onChange={(e) => handleInputChange('is_active', e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={isSubmitting}
          />
          <span className="ml-2 text-sm text-gray-700">Active</span>
        </label>
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
        {isSubmitting ? 'Creating...' : 'Create Farmer'}
      </button>
    </form>
  );
}
