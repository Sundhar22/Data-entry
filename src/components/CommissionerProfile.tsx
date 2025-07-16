'use client';
import React, { useState } from 'react';
import { Commissioner } from '@/types/commissioner';
import { useCommissioner } from '@/hooks/useCommissioner';

interface CommissionerProfileProps {
  onUpdate?: (commissioner: Commissioner) => void;
}

export default function CommissionerProfile({ onUpdate }: CommissionerProfileProps) {
  const { commissioner, loading, error, updateCommissioner } = useCommissioner();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Commissioner>>({});

  React.useEffect(() => {
    if (commissioner) {
      setFormData({
        name: commissioner.name,
        email: commissioner.email,
        phone: commissioner.phone,
        location: commissioner.location,
        commission_rate: commissioner.commission_rate,
      });
    }
  }, [commissioner]);

  const handleInputChange = (field: keyof Commissioner, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCommissioner(formData);
      setIsEditing(false);
      if (onUpdate && commissioner) {
        onUpdate({ ...commissioner, ...formData });
      }
    } catch (error) {
      console.error('Failed to update commissioner:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!commissioner) return <div>No commissioner found</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Commissioner Profile</h1>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
            <input
              type="number"
              step="0.01"
              value={formData.commission_rate || ''}
              onChange={(e) => handleInputChange('commission_rate', parseFloat(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="text-gray-900">{commissioner.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900">{commissioner.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <p className="text-gray-900">{commissioner.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <p className="text-gray-900">{commissioner.location}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Commission Rate</label>
              <p className="text-gray-900">{commissioner.commission_rate}%</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
