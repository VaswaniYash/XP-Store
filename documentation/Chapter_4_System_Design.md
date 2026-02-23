# Chapter 4 – System Design

## 4.1 Basic Modules
The system is modularized into several key components to ensure separation of concerns and maintainability.

### 4.1.1 Authentication Module
-   **Functionality**: Manages user registration, login, and session handling.
-   **Implementation**: Utilizes **NextAuth.js** with support for Google OAuth and credential-based login (via email/password).
-   **Middleware**: Protects private routes (e.g., Profile, Checkout) by verifying the user's session token before granting access.

### 4.1.2 Product Management Module
-   **Functionality**: Handles the display, filtering, and retrieval of product data.
-   **Features**:
    -   **Listing**: Fetches products from MongoDB and displays them in a grid layout.
    -   **Filtering**: allows users to filter products by platform (PlayStation, Xbox, Nintendo, PC).
    -   **Details**: Provides deep linking to individual product pages with comprehensive information.

### 4.1.3 User Profile Module
-   **Functionality**: Allows users to view and update their personal information.
-   **Data**: Manages user attributes such as Name, Email, Phone, Address, Bio, and Profile Picture.
-   **Synchronization**: Ensures UI updates immediately upon profile modification.

### 4.1.4 Cart & Order Module
-   **Functionality**: Manages the shopping session and order negotiation.
-   **Cart**: Uses local state/database to track items selected for purchase.
-   **Order**: Records the final transaction details, including items, total price, and status (e.g., "pending").

## 4.2 Data Design and Data Integrity
The application uses a **NoSQL** database (MongoDB) modeled with **Mongoose**.

### 4.2.1 Schema Design

#### User Schema
| Field | Type | Options | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Required | Full name of the user. |
| `email` | String | Required, Unique | Email address used for login. |
| `password` | String | Optional | Hashed password (omitted for OAuth users). |
| `role` | String | Default: "user" | Permission level (user/admin). |
| `phone` | String | Optional | Contact number. |
| `address` | String | Optional | Shipping address. |
| `image` | String | Optional | URL to profile avatar. |

#### Product Schema
| Field | Type | Options | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Required | Product title. |
| `description` | String | Required | Detailed product info. |
| `price` | Number | Required | Cost of the item. |
| `category` | String | Required | e.g., "Console", "Accessory". |
| `platform` | String | Optional | e.g., "PlayStation". |
| `stock` | Number | Default: 0 | Inventory count. |
| `features` | [String] | Array | List of key features. |

#### Order Schema
| Field | Type | Options | Description |
| :--- | :--- | :--- | :--- |
| `userId` | ObjectId | Ref: "User" | The customer. |
| `items` | Array | [{ productId, quantity, price }] | List of purchased items. |
| `total` | Number | Required | Final order amount. |
| `status` | String | Default: "pending" | Order state. |

### 4.2.2 Data Integrity and Constraints
-   **Unique Constraints**: The `email` field in the User schema is indexed as unique to prevent duplicate accounts.
-   **Referential Integrity**: Although MongoDB is NoSQL, Mongoose `ref` is used to link Orders to Users and Products, ensuring data consistency at the application level.
-   **Validation**: Mongoose schemas enforce types (e.g., `Number` for price) and required fields to prevent incomplete data entry.

## 4.3 User Interface and Design
The UI is built using a **Component-Based Architecture** with **Next.js**, **Tailwind CSS**, and **Shadcn UI**.

### 4.3.1 Design System
-   **Color Palette**: Modern dark/light mode capable, with platform-specific accent colors (Blue for PS, Green for Xbox, Red for Nintendo).
-   **Typography**: Clean sans-serif fonts for readability using `next/font`.
-   **Responsiveness**: Mobile-first approach using Tailwind's utility classes (e.g., `md:grid-cols-3`, `lg:grid-cols-4`).

### 4.3.2 Key Interfaces
1.  **Homepage**: Features a Hero section with animations, followed by "Best Sellers" and "New Arrivals" using a card-based layout.
2.  **Product Page**: Dedicated page with large imagery, detailed specs, and a prominent "Add to Cart" button.
3.  **Cart Drawer/Page**: A slide-out or dedicated view summarizing selected items with a live total calculation.

## 4.4 Security Issues
Security is a primary concern and is addressed at multiple layers.

### 4.4.1 Authentication & Authorization
-   **NextAuth.js**: Handles secure session management using HTTP-only cookies, preventing XSS attacks on session tokens.
-   **OAuth**: Google Login allows users to authenticate without sharing passwords directly with the application, delegating trust to a secure provider.

### 4.4.2 Data Protection
-   **Input Validation**: API routes validate incoming data types to prevent injection attacks or malformed data storage.
-   **Environment Variables**: Sensitive keys (e.g., `GOOGLE_CLIENT_ID`, `MONGODB_URI`) are stored in `.env.local` and never exposed to the client-side bundle.

### 4.4.3 Secure Communication
-   **HTTPS**: In production, all traffic is encrypted via SSL/TLS.
-   **Safe API Routes**: Backend logic is isolated in Next.js Server Actions or API routes, ensuring database logic is not exposed to the browser.

## 4.5 Test Cases
Testing ensures the system behaves as expected under various conditions.

| Test Case ID | Test Scenario | Steps | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-001** | User Registration | 1. Navigate to Sign Up<br>2. Enter valid details<br>3. Click Register | User account created, redirected to login. | As Expected | **Pass** |
| **TC-002** | User Login (Invalid) | 1. Enter valid email<br>2. Enter wrong password | Error message: "Invalid credentials". | As Expected | **Pass** |
| **TC-003** | Google OAuth | 1. Click "Sign in with Google"<br>2. Authorize account | Logged in successfully, name displayed. | As Expected | **Pass** |
| **TC-004** | Add to Cart | 1. Open Product Page<br>2. Click "Add to Cart" | Toast notification appears, Cart count +1. | As Expected | **Pass** |
| **TC-005** | Filter Products | 1. Go to Consoles page<br>2. Select "Xbox" filter | Only Xbox products are displayed. | As Expected | **Pass** |
| **TC-006** | Profile Update | 1. Go to Profile<br>2. Edit Bio<br>3. Save | Profile updates immediately without reload. | As Expected | **Pass** |
