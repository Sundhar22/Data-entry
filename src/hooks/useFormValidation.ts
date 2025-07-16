import { useState, useCallback } from 'react';
import { z } from 'zod';
import { validateSchema } from '@/lib/validation';

interface UseFormValidationOptions<T> {
  schema: z.ZodSchema<T>;
  onSubmit: (data: T) => Promise<void>;
  initialValues?: Partial<T>;
}

interface FormState<T> {
  values: Partial<T>;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

export function useFormValidation<T>({
  schema,
  onSubmit,
  initialValues = {},
}: UseFormValidationOptions<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: false,
  });

  const setValue = useCallback((field: keyof T, value: any) => {
    setFormState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [field]: value,
      },
      touched: {
        ...prev.touched,
        [field]: true,
      },
      errors: {
        ...prev.errors,
        [field]: [], // Clear errors for this field
      },
    }));
  }, []);

  const setError = useCallback((field: keyof T, error: string) => {
    setFormState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: [error],
      },
    }));
  }, []);

  const validateField = useCallback((field: keyof T, value: any) => {
    try {
      // For single field validation, we'll validate the whole form
      // and extract the error for the specific field
      const testValues = {
        ...formState.values,
        [field]: value,
      };
      
      const validation = validateSchema(schema, testValues);
      
      if (validation.success) {
        setError(field, '');
        return true;
      } else {
        const fieldError = validation.errors?.[field as string]?.[0];
        if (fieldError) {
          setError(field, fieldError);
        }
        return false;
      }
    } catch (error) {
      setError(field, 'Invalid value');
      return false;
    }
  }, [schema, formState.values, setError]);

  const setAllErrors = useCallback((errors: Record<string, string[]>) => {
    setFormState(prev => ({
      ...prev,
      errors,
    }));
  }, []);

  const validateForm = useCallback(() => {
    const validation = validateSchema(schema, formState.values);
    
    if (!validation.success) {
      setAllErrors(validation.errors || {});
      return false;
    }

    setAllErrors({});
    return true;
  }, [schema, formState.values, setAllErrors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const validation = validateSchema(schema, formState.values);
      if (validation.success) {
        await onSubmit(validation.data!);
        setFormState(prev => ({ ...prev, errors: {} }));
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          _form: ['An error occurred while submitting the form. Please try again.']
        }
      }));
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [validateForm, schema, formState.values, onSubmit]);

  const getFieldError = useCallback((field: keyof T): string | undefined => {
    return formState.errors[field as string]?.[0];
  }, [formState.errors]);

  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: false,
    });
  }, [initialValues]);

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    setValue,
    setError,
    validateField,
    validateForm,
    handleSubmit,
    getFieldError,
    resetForm,
  };
}
