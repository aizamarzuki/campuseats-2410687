# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
Plain DOM code requires manually writing steps to find and update elements whenever data changes. React lets you just describe how the UI should look based on current state, and it automatically manages DOM updates in the background.

2. Why must a component name start with a capital letter?
JSX relies on capital letters to tell custom React components apart from built-in HTML elements. If you use lowercase, React assumes it's a standard HTML tag and fails to render your component properly.

3. What does a fragment <>...</> do, and why not just use a <div>?
A fragment lets you group multiple elements together without inserting an extra node into the actual DOM. Using a <div> adds unnecessary markup that can disrupt CSS layout styles like Flexbox or Grid.

4. Name one benefit of splitting the UI into small components.
It allows you to reuse UI code across different parts of your application while keeping individual files clean, focused, and easy to maintain or debug.

# Week 2 reflection

Answer each question in 1–3 sentences, in your own words.

1. What are props and how do they differ from state in React?
Props are read-only inputs passed from a parent component to configure a child. State is internal, mutable data owned by a component that triggers a re-render whenever it gets updated.

2. Why is a unique `key` prop required when rendering lists using `.map()`?
Keys give React a stable identity for each list item so it can accurately track additions, removals, and updates. Without unique keys, React can render wrong items or encounter performance and state issues.

3. Why does calling `setCount(count + 1)` multiple times in a single click event handler only increment the count once?
State values remain constant throughout the execution of a single render cycle. To queue multiple updates in one handler, you must pass an updater function like `setCount((prev) => prev + 1)`.

4. How do child components notify parent components about user events?
Parent components pass callback functions down to children as props. When a user interacts with the child component, it executes that callback to pass data or notifications back up to the parent.

# Week 3 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is a controlled input, and what happens if an `<input>` has a `value` prop without an `onChange` handler?
A controlled input has its current value bound directly to React state. If you specify a `value` without an `onChange` handler, the input becomes read-only because user typing cannot update the state.

2. What does "lifting state up" mean, and when should it be used?
Lifting state up means relocating state to the nearest common parent component of multiple siblings. It should be used whenever sibling components need to access or synchronize the same piece of data.

3. Why should derived values (like cart totals or filtered arrays) not be stored in separate state?
Derived values can be computed on the fly during render from existing state or props. Storing them in dedicated state creates redundant state management and risks data getting out of sync.

4. What is the purpose of the cleanup function in `useEffect` when fetching data?
The cleanup function runs when a component unmounts or re-renders to abort active network requests using `AbortController.abort()`. This prevents memory leaks and avoids setting state on unmounted components.

# Week 4 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is a custom hook, and why extract logic into one?
A custom hook is a JavaScript function starting with `use` that packages reusable stateful logic and React hooks. Extracting logic into a custom hook keeps components lean and allows sharing stateful behavior across multiple components.

2. What problem does the Context API solve compared to passing props?
Context solves the issue of prop drilling by providing a way to share data globally across the component tree. It lets any component access shared values—like cart state—without manually passing props down through every level.

3. How does React Router handle dynamic URL parameters like `/vendor/:id`?
React Router uses colon syntax (`:id`) to define dynamic path parameters in route paths. The component matching the route can then read the parameter values using the `useParams()` hook to display vendor-specific content.

4. How do layout routes and `<Outlet/>` simplify multi-page application structure?
Layout routes wrap shared UI elements (like headers and footers) inside a master structure. The `<Outlet/>` component acts as a dynamic slot where matching child page components get rendered based on the current URL.
