# Frontend Components Documentation

## Overview

This document provides comprehensive documentation for all React components used in the Data Entry application, including their props, usage examples, and best practices.

---

## 🧩 **Core Components**

### FarmerForm Component

A form component for creating and updating farmer information.

#### Props Interface

```typescript
interface FarmerFormProps {
  initialData?: Partial<CreateFarmerData>; // Optional initial form data
  onSubmit: (data: CreateFarmerData) => Promise<void>; // Form submission handler
}

interface CreateFarmerData {
  name: string; // Farmer's name
  phone: string; // Farmer's phone number
  village: string; // Farmer's village
  commissioner_id: string; // Commissioner ID
  is_active?: boolean; // Active status (default: true)
}
```

#### Usage Example

```tsx
import FarmerForm from "@/components/FarmerForm";

const CreateFarmerPage = () => {
  const handleSubmit = async (data: CreateFarmerData) => {
    try {
      const response = await fetch("/api/farmers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create farmer");
      }

      alert("Farmer created successfully!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <h1>Create New Farmer</h1>
      <FarmerForm onSubmit={handleSubmit} />
    </div>
  );
};
```

#### Features

- **Validation**: Real-time Zod validation with error display
- **Commissioner Selection**: Automatic loading of commissioners
- **Loading States**: Shows loading indicators during API calls
- **Error Handling**: Displays field-specific validation errors
- **Accessibility**: Proper ARIA labels and keyboard navigation

#### Internal Structure

```tsx
const FarmerForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(/* initial state */);
  const [errors, setErrors] = useState({});
  const [commissioners, setCommissioners] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load commissioners on mount
  useEffect(() => {
    fetchCommissioners();
  }, []);

  // Form handlers
  const handleInputChange = (field, value) => {
    /* ... */
  };
  const handleSubmit = async (e) => {
    /* ... */
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
};
```

---

### CommissionerForm Component

A form component for creating and updating commissioner profiles.

#### Props Interface

```typescript
interface CommissionerFormProps {
  initialData?: Partial<CommissionerData>; // Optional initial form data
  onSubmit: (data: CommissionerData) => Promise<void>; // Form submission handler
  mode: "create" | "update"; // Form mode
}

interface CommissionerData {
  name: string; // Commissioner's name
  email: string; // Commissioner's email
  phone: string; // Commissioner's phone
  location: string; // Commissioner's location
  commission_rate?: number; // Commission rate (0-100)
}
```

#### Usage Example

```tsx
import CommissionerForm from "@/components/CommissionerForm";

const CommissionerProfilePage = () => {
  const [commissioner, setCommissioner] = useState(null);

  const handleUpdate = async (data: CommissionerData) => {
    try {
      const response = await fetch("/api/commissioner/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updated = await response.json();
      setCommissioner(updated);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <CommissionerForm
        initialData={commissioner}
        onSubmit={handleUpdate}
        mode="update"
      />
    </div>
  );
};
```

---

### CommissionerProfile Component

A display component for showing commissioner profile information.

#### Props Interface

```typescript
interface CommissionerProfileProps {
  commissioner: Commissioner | null; // Commissioner data
  loading: boolean; // Loading state
  onEdit?: () => void; // Optional edit handler
}

interface Commissioner {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  commission_rate: number;
  created_at: string;
  updated_at: string;
}
```

#### Usage Example

```tsx
import CommissionerProfile from "@/components/CommissionerProfile";
import { useCommissioner } from "@/hooks/useCommissioner";

const ProfilePage = () => {
  const { commissioner, loading, error } = useCommissioner();
  const [isEditing, setIsEditing] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <CommissionerProfile
        commissioner={commissioner}
        loading={loading}
        onEdit={() => setIsEditing(true)}
      />

      {isEditing && (
        <CommissionerForm
          initialData={commissioner}
          onSubmit={handleUpdate}
          mode="update"
        />
      )}
    </div>
  );
};
```

---

## 🎨 **UI Components**

### Button Component

A reusable button component with various styles and states.

#### Props Interface

```typescript
interface ButtonProps {
  children: React.ReactNode; // Button content
  variant?: "primary" | "secondary" | "danger" | "outline"; // Button style
  size?: "sm" | "md" | "lg"; // Button size
  disabled?: boolean; // Disabled state
  loading?: boolean; // Loading state
  type?: "button" | "submit" | "reset"; // HTML button type
  onClick?: () => void; // Click handler
  className?: string; // Additional CSS classes
}
```

#### Usage Example

```tsx
import Button from "@/components/ui/button";

const Example = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await someAsyncOperation();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-x-2">
      <Button variant="primary" onClick={handleClick} loading={loading}>
        Primary Action
      </Button>

      <Button variant="outline" size="sm">
        Small Outline
      </Button>

      <Button variant="danger" disabled>
        Disabled Danger
      </Button>
    </div>
  );
};
```

#### Styling Classes

```css
/* Base button styles */
.btn {
  @apply inline-flex items-center justify-center rounded-md font-medium transition-colors;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

/* Size variants */
.btn-sm {
  @apply px-3 py-1.5 text-sm h-8;
}
.btn-md {
  @apply px-4 py-2 text-base h-10;
}
.btn-lg {
  @apply px-6 py-3 text-lg h-12;
}

/* Color variants */
.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}
.btn-secondary {
  @apply bg-gray-600 text-white hover:bg-gray-700;
}
.btn-danger {
  @apply bg-red-600 text-white hover:bg-red-700;
}
.btn-outline {
  @apply border-2 border-gray-300 bg-transparent hover:bg-gray-50;
}
```

---

## 🏗️ **Layout Components**

### Header Component

Navigation header component with authentication state.

#### Props Interface

```typescript
interface HeaderProps {
  user?: User | null; // Authenticated user data
  onLogout?: () => void; // Logout handler
}

interface User {
  id: string;
  name: string;
  email: string;
}
```

#### Usage Example

```tsx
import Header from "@/components/layout/header";
import { useAuth } from "@/hooks/useAuth";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={logout} />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};
```

#### Features

- **Responsive Design**: Mobile-friendly navigation
- **User Menu**: Profile and logout options
- **Navigation Links**: Dynamic based on authentication state
- **Breadcrumbs**: Shows current page location

---

### Footer Component

Application footer with links and information.

#### Props Interface

```typescript
interface FooterProps {
  showLinks?: boolean; // Show footer links
  compact?: boolean; // Compact version
}
```

#### Usage Example

```tsx
import Footer from "@/components/layout/footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">{children}</main>

      <Footer showLinks={true} />
    </div>
  );
};
```

---

## 🎣 **Custom Hooks**

### useAuth Hook

Hook for managing authentication state and operations.

#### Return Interface

```typescript
interface UseAuthReturn {
  user: User | null; // Current user
  isAuthenticated: boolean; // Authentication status
  loading: boolean; // Loading state
  error: string | null; // Error message
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  refreshUser: () => Promise<void>;
}
```

#### Usage Example

```tsx
import { useAuth } from "@/hooks/useAuth";

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      // Redirect or show success
    } catch (err) {
      // Error already handled by hook
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        disabled={loading}
      />

      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        disabled={loading}
      />

      <Button type="submit" loading={loading}>
        Login
      </Button>

      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};
```

---

### useCommissioner Hook

Hook for managing commissioner data and operations.

#### Return Interface

```typescript
interface UseCommissionerReturn {
  commissioner: Commissioner | null; // Commissioner data
  loading: boolean; // Loading state
  error: string | null; // Error message
  updateCommissioner: (data: UpdateCommissionerData) => Promise<void>;
  refreshCommissioner: () => Promise<void>;
}
```

#### Implementation

```typescript
export function useCommissioner() {
  const [commissioner, setCommissioner] = useState<Commissioner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommissioner = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/commissioner/me", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch commissioner");
      }

      const data = await response.json();
      setCommissioner(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateCommissioner = async (data: UpdateCommissionerData) => {
    try {
      const response = await fetch("/api/commissioner/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update commissioner");
      }

      const updated = await response.json();
      setCommissioner(updated);
    } catch (err) {
      throw err; // Re-throw for component handling
    }
  };

  useEffect(() => {
    fetchCommissioner();
  }, []);

  return {
    commissioner,
    loading,
    error,
    updateCommissioner,
    refreshCommissioner: fetchCommissioner,
  };
}
```

---

### useFormValidation Hook

Hook for form validation using Zod schemas.

#### Parameters & Return

```typescript
function useFormValidation<T>(
  schema: ZodSchema<T>,
  initialValues: T,
): {
  values: T;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  isValid: boolean;
  setValue: (field: keyof T, value: any) => void;
  setTouched: (field: keyof T, touched: boolean) => void;
  validate: () => boolean;
  reset: () => void;
};
```

#### Usage Example

```tsx
import { useFormValidation } from "@/hooks/useFormValidation";
import { CreateFarmerSchema } from "@/schemas/farmer";

const FarmerForm = ({ onSubmit }) => {
  const { values, errors, touched, isValid, setValue, setTouched, validate } =
    useFormValidation(CreateFarmerSchema, {
      name: "",
      phone: "",
      village: "",
      commissioner_id: "",
      is_active: true,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await onSubmit(values);
    } catch (error) {
      // Handle submission error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          value={values.name}
          onChange={(e) => setValue("name", e.target.value)}
          onBlur={() => setTouched("name", true)}
        />
        {touched.name && errors.name && (
          <div className="text-red-500">{errors.name[0]}</div>
        )}
      </div>

      {/* More fields... */}

      <Button type="submit" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );
};
```

---

## 🎯 **Component Patterns**

### Loading States

Standard pattern for handling loading states:

```tsx
const DataComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error: {error}</p>
        <Button onClick={fetchData} variant="outline" size="sm">
          Retry
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-gray-500 py-8">No data available</div>
    );
  }

  return <div>{/* Render data */}</div>;
};
```

### Error Boundaries

Error boundary component for catching React errors:

```tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-red-800 font-semibold">Something went wrong</h2>
          <p className="text-red-600">
            Please refresh the page or try again later.
          </p>
          <Button
            onClick={() => this.setState({ hasError: false, error: null })}
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
const App = () => {
  return (
    <ErrorBoundary>
      <YourComponents />
    </ErrorBoundary>
  );
};
```

### Form Validation Pattern

Consistent form validation pattern:

```tsx
const ValidatedForm = ({ onSubmit, validationSchema, initialValues }) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (field, value) => {
    try {
      const fieldSchema = validationSchema.pick({ [field]: true });
      fieldSchema.parse({ [field]: value });

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [field]: error.errors.map((e) => e.message),
      }));
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validatedData = validationSchema.parse(formData);
      await onSubmit(validatedData);
    } catch (error) {
      // Handle validation errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>{/* Form fields with validation */}</form>
  );
};
```

---

## 💅 **Styling Guidelines**

### Tailwind CSS Classes

Common utility classes used throughout the application:

```css
/* Layout */
.container {
  @apply mx-auto px-4 max-w-6xl;
}
.section {
  @apply py-8 px-4;
}
.card {
  @apply bg-white rounded-lg shadow-md p-6;
}

/* Typography */
.heading-1 {
  @apply text-3xl font-bold text-gray-900;
}
.heading-2 {
  @apply text-2xl font-semibold text-gray-800;
}
.heading-3 {
  @apply text-xl font-medium text-gray-700;
}
.body-text {
  @apply text-base text-gray-600;
}
.small-text {
  @apply text-sm text-gray-500;
}

/* Forms */
.form-group {
  @apply mb-4;
}
.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}
.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500;
}
.form-error {
  @apply text-sm text-red-600 mt-1;
}

/* Buttons */
.btn-base {
  @apply inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2;
}

/* States */
.loading {
  @apply opacity-50 cursor-wait;
}
.disabled {
  @apply opacity-50 cursor-not-allowed;
}
.error-state {
  @apply border-red-300 bg-red-50;
}
.success-state {
  @apply border-green-300 bg-green-50;
}
```

### Responsive Design

Mobile-first responsive patterns:

```css
/* Mobile first approach */
.responsive-grid {
  @apply grid grid-cols-1;
  @apply md:grid-cols-2;
  @apply lg:grid-cols-3;
  @apply xl:grid-cols-4;
  @apply gap-4;
}

.responsive-text {
  @apply text-sm;
  @apply md:text-base;
  @apply lg:text-lg;
}

.responsive-padding {
  @apply p-4;
  @apply md:p-6;
  @apply lg:p-8;
}
```

---

## 🔗 **Related Documentation**

- [API Overview](./API_OVERVIEW.md) - API endpoints used by components
- [Authentication Guide](./AUTHENTICATION_GUIDE.md) - Authentication integration
- [Validation Guide](./VALIDATION_GUIDE.md) - Form validation patterns
- [Data Models](./DATA_MODELS.md) - TypeScript interfaces and types

This documentation covers all frontend components, hooks, and patterns used in the Data Entry application. All components follow React best practices and include proper TypeScript definitions.
