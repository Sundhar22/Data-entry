# Zod Validation System

This project now includes a comprehensive validation system using Zod for type-safe form validation and API validation.

## Features

- 📋 **Form Validation**: Real-time validation with error messages
- 🔧 **API Validation**: Server-side validation for API endpoints
- 🎯 **Type Safety**: Full TypeScript support with Zod schemas
- 🎨 **Reusable Components**: Custom hooks and form components
- 📝 **Multiple Schemas**: Support for different data models

## Quick Start

### 1. Using the Form Component

```tsx
import CommissionerForm from '@/components/CommissionerForm';

export default function MyPage() {
  const handleSubmit = async (data: z.infer<typeof CreateCommissionerSchema>) => {
    const response = await fetch('/api/commissioner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };

  return <CommissionerForm onSubmit={handleSubmit} />;
}
```

### 2. Using the Custom Hook

```tsx
import { useFormValidation } from '@/hooks/useFormValidation';
import { CreateCommissionerSchema } from '@/schemas/commissioner';

export default function MyForm() {
  const {
    values,
    errors,
    handleSubmit,
    setValue,
    getFieldError,
  } = useFormValidation({
    schema: CreateCommissionerSchema,
    onSubmit: async (data) => {
      // Submit your data
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={values.name || ''}
        onChange={(e) => setValue('name', e.target.value)}
      />
      {getFieldError('name') && <span>{getFieldError('name')}</span>}
    </form>
  );
}
```

### 3. API Validation

```typescript
import { validateRequest } from '@/lib/validation';
import { CreateCommissionerSchema } from '@/schemas/commissioner';

export async function POST(request: Request) {
  const validation = await validateRequest(request, CreateCommissionerSchema);
  
  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.errors },
      { status: 400 }
    );
  }

  // Use validation.data - it's fully typed!
  const commissioner = await prisma.commissioner.create({
    data: validation.data,
  });

  return NextResponse.json(commissioner);
}
```

## Available Schemas

- **CommissionerSchema**: Full commissioner with all fields
- **CreateCommissionerSchema**: For creating new commissioners
- **UpdateCommissionerApiSchema**: For updating existing commissioners  
- **FarmerSchema**: Full farmer data validation
- **CreateFarmerSchema**: For creating new farmers
- **ProductSchema**: Product validation
- **CategorySchema**: Category validation

## Files Structure

```
src/
├── schemas/           # Zod validation schemas
│   ├── commissioner.ts
│   ├── farmer.ts
│   ├── product.ts
│   └── category.ts
├── lib/
│   └── validation.ts  # Validation utilities
├── hooks/
│   └── useFormValidation.ts  # Custom validation hook
└── components/
    └── CommissionerForm.tsx  # Example form component
```

## Testing the System

1. Visit `/example` to see the commissioner form in action
2. Try submitting invalid data to see validation errors
3. Test the API endpoints at `/api/commissioner/me`

## Validation Features

- **Real-time validation**: Errors appear as you type
- **Field-level validation**: Individual field validation
- **Form-level validation**: Complete form validation on submit
- **API validation**: Server-side validation with detailed error messages
- **Type safety**: Full TypeScript support throughout

## Error Handling

The validation system provides detailed error messages:
- Field-specific errors for individual inputs
- Form-level errors for submission issues
- API errors with structured error responses
- User-friendly error messages for common validation failures
