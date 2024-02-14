import { useState } from "react";

const initalTodos = [
  { id: 1, item: "Sony Play Station 5", total: 1 },
  { id: 2, item: "DualShock controller 5", total: 3 },
  { id: 3, item: "Apple macbook Pro 2024", total: 1 },
];

function App() {
  return <Todo />;
}

function Todo() {


  return (
    <div>
      <ul>
        {initalTodos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ todo}) {
  const [count, setCount] = useState(0);

  function handleCountIncrement() {
    setCount(() => count + 1)
  }

  function handleCountDecrement() {
    setCount(() => count - 1)
  }
  console.log(todo);
  return (
    <>
    <li>
      <h3>{todo.item}</h3>
      <button onClick={handleCountDecrement}>-</button>
      <span>{todo.total + count}</span>
      <button onClick={handleCountIncrement}>+</button>
    </li>
    <p>You haven't packed some items, you still have X items left</p>
    </>
  );
}

export default App;
