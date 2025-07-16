# Zod Validation System

This project now includes a comprehensive validation system using Zod for type-safe form validation and API validation.

## Features

- 📋 **Form Validation**: Real-time validation with error messages
- 🔧 **API Validation**: Server-side validation for API endpoints
- 🎯 **Type Safety**: Full TypeScript support with Zod schemas
- 🎨 **Reusable Components**: Custom hooks and form components
- 📝 **Multiple Schemas**: Support for different data models

## Quick Start

### 1. Using the Form Component - Farmer Example

```tsx
import FarmerForm from '@/components/FarmerForm';

export default function FarmersPage() {
  const handleSubmit = async (data: z.infer<typeof CreateFarmerSchema>) => {
    const response = await fetch('/api/farmers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include authentication cookies
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create farmer');
    }
  };

  return <FarmerForm onSubmit={handleSubmit} />;
}
```

### 2. Using the Custom Hook - Farmer Example

```tsx
import { useFormValidation } from '@/hooks/useFormValidation';
import { CreateFarmerSchema } from '@/schemas/farmer';

export default function FarmerForm() {
  const {
    values,
    errors,
    handleSubmit,
    setValue,
    getFieldError,
  } = useFormValidation({
    schema: CreateFarmerSchema,
    onSubmit: async (data) => {
      const response = await fetch('/api/farmers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include auth cookies
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create farmer');
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Farmer Name"
        value={values.name || ''}
        onChange={(e) => setValue('name', e.target.value)}
      />
      {getFieldError('name') && <span className="error">{getFieldError('name')}</span>}
      
      <input
        placeholder="Phone Number"
        value={values.phone || ''}
        onChange={(e) => setValue('phone', e.target.value)}
      />
      {getFieldError('phone') && <span className="error">{getFieldError('phone')}</span>}
      
      <input
        placeholder="Village"
        value={values.village || ''}
        onChange={(e) => setValue('village', e.target.value)}
      />
      {getFieldError('village') && <span className="error">{getFieldError('village')}</span>}
      
      <button type="submit">Create Farmer</button>
    </form>
  );
}
```

### 3. API Validation - Farmers Example

```typescript
import { validateRequest } from '@/lib/validation';
import { CreateFarmerSchema } from '@/schemas/farmer';

export async function POST(request: Request) {
  const validator = validateRequest(CreateFarmerSchema);
  const validation = await validator(request);
  
  if (!validation.success) {
    return validation.response; // Returns NextResponse with validation errors
  }

  // Use validation.data - it's fully typed!
  const farmer = await prisma.farmer.create({
    data: {
      ...validation.data,
      commissioner_id: userId // Added by authentication
    }
  });

  return NextResponse.json(farmer, { status: 201 });
}
```

## Available Schemas

### Commissioner Schemas
- **CommissionerSchema**: Full commissioner with all fields
- **CreateCommissionerSchema**: For creating new commissioners
- **UpdateCommissionerApiSchema**: For updating existing commissioners  

### Farmer Schemas
- **FarmerSchema**: Full farmer data validation
- **CreateFarmerSchema**: For creating new farmers
- **UpdateFarmerSchema**: For updating existing farmers

### Other Schemas
- **ProductSchema**: Product validation
- **CategorySchema**: Category validation

### Farmer Schema Details

```typescript
// Full farmer schema
export const FarmerSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  village: z.string().min(1, "Village is required"),
  commissioner_id: z.string().cuid(),
  is_active: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date(),
});

// Create farmer schema (excludes auto-generated fields)
export const CreateFarmerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  village: z.string().min(1, "Village is required"),
  is_active: z.boolean().default(true).optional(),
});

// Update farmer schema
export const UpdateFarmerSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "Name is required").optional(),
  phone: z.string().min(1, "Phone number is required").optional(),
  village: z.string().min(1, "Village is required").optional(),
  is_active: z.boolean().optional(),
});
```

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
    ├── CommissionerForm.tsx  # Example form component
    └── FarmerForm.tsx        # Farmer form component
```

## Testing the System

1. **Login**: Visit `/api/auth/login` to authenticate first
2. **Visit UI**: Go to `/farmers` to see the farmer management interface
3. **Test API**: Use farmer endpoints at `/api/farmers` 
4. **Test Validation**: Try submitting invalid data to see validation errors
5. **Test Forms**: Use the form components to test real-time validation

## Authentication Integration

All validation now works with the authentication system:
- API endpoints require authentication cookies
- Form submissions include authentication headers
- Validation errors are returned with proper HTTP status codes
- See [Authentication Guide](./AUTHENTICATION_GUIDE.md) for more details

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
