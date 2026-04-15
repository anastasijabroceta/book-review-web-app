import { useState } from 'react'

import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello React 👋</h1>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Klikni me
      </button>
    </div>
  );
}

export default App;
