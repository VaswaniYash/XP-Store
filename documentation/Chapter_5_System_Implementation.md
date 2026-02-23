# Chapter 5 – System Coding, Implementation and Testing

## 5.1 Coding Details

This section provides an overview of the implementation details, including the project structure, key code components, and coding standards used in the XP Store development.

### 5.1.1 Project Directory Structure
The project follows the standard Next.js App Router structure, ensuring organized and scalable code.

```
xp-store/
├── app/                    # App Router pages and layouts
│   ├── (auth)/             # Authentication routes (login, register)
│   ├── api/                # Backend API routes
│   ├── cart/               # Cart page
│   ├── product/            # Dynamic product details pages
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Homepage
├── components/             # Reusable UI components
│   ├── ui/                 # Shadcn UI primitives (Button, Card, Input)
│   ├── products/           # Product-related components (Card, Grid)
│   └── layout/             # Global layout components (Navbar, Footer)
├── lib/                    # Utility functions and configurations
│   ├── db.ts               # Database connection logic
│   ├── auth.ts             # NextAuth configuration
│   └── mongoose-models.ts  # Mongoose schemas
└── public/                 # Static assets (images, icons)
```

### 5.1.2 Key Code Implementations

#### Database Connection (`lib/db.ts`)
We use a cached connection pattern to efficiently manage MongoDB connections in a serverless environment.

```typescript
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) throw new Error("Please add MONGO_URI to .env");

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  const db = await mongoose.connect(MONGO_URI);
  isConnected = db.connections[0].readyState === 1;
  console.log(`MongoDB Connected: ${db.connection.host}`);
}
```

#### Authentication Configuration (`lib/auth.ts`)
NextAuth.js is configured with Google OAuth and MongoDB persistence.

```typescript
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { connectDB } from "@/lib/db"
import { User } from "@/lib/mongoose-models"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                await connectDB();
                const existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                        role: "user"
                    });
                }
            }
            return true;
        }
    }
})
```

#### Product Card Component (`components/products/product-card.tsx`)
This component demonstrates the usage of client-side interactivity (state) within the App Router architecture.

```typescript
'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useCartContext } from '@/components/providers/cart-context';
import { useState } from 'react';

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartContext();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Card className="group hover:shadow-lg transition-all">
       {/* Product Image and Details Omitted for Brevity */}
      <CardFooter>
        <Button onClick={handleAddToCart} className={added ? 'bg-green-600' : ''}>
          {added ? 'Added!' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### 5.1.3 Coding Standards
-   **TypeScript**: Strongly typed interfaces (e.g., `interface Product`) are used to prevent runtime errors.
-   **Modularization**: Components are small and focused (Single Responsibility Principle).
-   **Styling**: Tailwind CSS utility classes are used for consistent and responsive design (e.g., `flex`, `grid-cols-4`).
-   **Linting**: ESLint represents the quality gate, ensuring no unused variables or potential bugs.

## 5.2 Testing Approach

The testing strategy for XP Store involves a mix of manual verification during development and structured functional testing of key user flows.

### 5.2.1 Unit Testing
Unit testing focuses on verifying the correctness of individual functions or components in isolation from the rest of the system.

-   **Tools**: Jest and React Testing Library (Conceptual).
-   **Scope**:
    -   **Utility Functions**: Testing `formatCurrency(price)` to ensure it returns `₹1,999` correctly.
    -   **UI Components**: verifying that `<Button />` renders with the correct text and handles user clicks.
    -   **Validation Logic**: Ensuring the `validateEmail` function rejects invalid email formats.

**Example Test Case (Conceptual):**
```javascript
test('ProductCard adds item to cart on click', () => {
  const addToCartMock = jest.fn();
  render(<ProductCard product={mockProduct} addToCart={addToCartMock} />);
  
  fireEvent.click(screen.getByText('Add to Cart'));
  
  expect(addToCartMock).toHaveBeenCalledWith(mockProduct, 1);
});
```

### 5.2.2 Integrated Testing
Integrated testing validates that different modules of the system work together correctly. This includes testing the interaction between the frontend, API, and database.

-   **Scope**:
    -   **User Flow**: User logs in via Google -> Session created in Database -> UI updates to show Profile Image.
    -   **Cart Logic**: User adds item -> Context updates -> LocalStorage persists data -> Cart Page reflects changes.
    -   **API Endpoints**: Sending a `GET /api/products?category=Xbox` request and verifying that only Xbox products are returned.

**Key Integration Scenarios**:
1.  **Authentication Flow**: Verifying the redirect callback from Google and subsequent session creation.
2.  **Order Placement**: Simulating a checkout process to ensure Order creation in MongoDB linked to the correct User.
