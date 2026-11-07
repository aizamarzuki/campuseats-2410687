# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s):None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 2
- Tool(s):None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 3
- Tool(s): Gemini
- What I asked for: 
  1. How to properly implement `useEffect` for fetching mock vendor data from `/api/vendors.json` using `AbortController` cleanup, and handling `loading`, `error`, and `reloadKey` states.
  2. Diagnosing why the app remained stuck on "Loading menus..." despite the network tab showing a successful HTTP 304 response during the `useEffect` fetch.
  3. Implementing cart state operations (`handleAddToCart`, `handleChangeQty`, `handleRemove`) and computing totals dynamically using `cart.reduce(...)` across `App.jsx`, `CartPage.jsx`, and `CartItem.jsx`.
  4. Setting up controlled form inputs and validation rules (Name, Mahallah selection, Pickup Time between 07:00 and 22:00) in `CheckoutForm.jsx`.
  5. Clarifying Task B1 guidelines for formatting and combining classmates' JSON data inside `public/api/vendors.json`.
- What I kept, changed or rejected, and why:
  - Kept the `useEffect` asynchronous fetch pattern with `AbortController` (`return () => controller.abort()`) and `reloadKey` dependency to strictly fulfill Lab 3 requirements.
  - Kept setting `setLoading(false)` explicitly inside `.then()` and error handlers so the loading spinner unmounts when the fetch finishes.
  - Kept updating cart items immutably (updating `qty` or filtering) instead of mutating state directly with `cart.push()`.
  - Kept deriving total prices on the fly using `.reduce()` instead of redundantly storing totals in state.
- One thing the AI got wrong and how I fixed it: The AI spotted a single-letter casing bug where `if (Loading)` in `App.jsx` was checking the imported `<Loading />` component function reference (which always evaluates to truthy) instead of the `loading` boolean state variable (lowercase `l`). Changing `Loading` to `loading` allowed the `useEffect` completion state to render the main vendor view.
## Week 4
- Tool(s): Gemini
- What I Asked:
  1. How to migrate global state to `CartProvider` and write `useCart`, `useLocalStorage`, and `useVendors` custom hooks.
  2. How to implement client-side routing using React Router 8 (`BrowserRouter`, `Routes`, `Route`, `Outlet`, `NavLink`, `useParams`, `useNavigate`).
  3. How to implement Week 4 step for Digit 7 personal feature (persisting item notes in order history).
- What I kept, changed or rejected, and why:
  1. Created `CartProvider` supplying cart state, order history, and `updateNote` handler.
  2. Rendered saved item notes under each line item on `OrdersPage.jsx`.
- One thing the AI got wrong and how I fixed it:
The AI generated code importing components from `react-router-dom`, which is obsolete in React Router 8 where all routing hooks and elements are imported directly from `react-router`. I updated all imports to `from 'react-router'`.