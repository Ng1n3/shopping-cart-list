import { useState } from "react";

// const initalTodos = [
//   { id: 1, item: "Sony Play Station 5", total: 1 },
//   { id: 2, item: "DualShock controller 5", total: 3 },
//   { id: 3, item: "Apple macbook Pro 2024", total: 1 },
// ];

function App() {
  return <Todo />;
}

function Todo() {
  const [name, setName] = useState("");
  const [carts, setcarts] = useState([]);

  function handleAddcart(cart) {
    setcarts((prevcart) => [...prevcart, cart]);
  }

  const id = crypto.randomUUID();
  function handleSubmit(e) {
    e.preventDefault();
    const newCart = {
      id,
      item: name,
      total: 1,
      selected: false,
    };

    handleAddcart(newCart);
    setName("");
  }

  function handleCross(id) {
    setcarts((prevcart) =>
      prevcart.map((cart) =>
        cart.id === id ? { ...cart, selected: !cart.selected } : cart
      )
    );
  }

  

  return (
    <>
      <h1> QUICK SHOPPING CART</h1>
      <div className="Todo">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add your item"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {carts.map((cart) => (
            <TodoItem
              cart={cart}
              key={cart.id}
              onCross={() => handleCross(cart.id)}
            />
          ))}
        </ul>
      </div>
      <Footer carts={carts} />
    </>
  );
}

function TodoItem({ cart, onCross }) {
  const [count, setCount] = useState(0);

  function handleCountIncrement(e) {
    e.stopPropagation();
    setCount((prevCount) => prevCount + 1);
  }

  function handleCountDecrement(e) {
    e.stopPropagation();
    setCount((prevCount) => Math.max(prevCount - 1, 0));
  }

  const totalCount = cart.total + count;

  return (
    <>
      <li
        className={cart.selected ? "item selected" : "item"}
        onClick={onCross}
      >
        <h3>{cart.item}</h3>
        {cart.selected ? null : (
          <div>
            <button onClick={handleCountDecrement}>-</button>
            <span> {totalCount} </span>
            <button onClick={handleCountIncrement}>+</button>
          </div>
        )}
      </li>
    </>
  );
}

function Footer({ carts }) {
  const remainingItems = carts.filter((cart) => !cart.selected).length;
  const cartTotals = carts.reduce((total, cart) => total + cart.total + cart.count, 0);
  console.log(carts);
  // console.log(remainingItems)
  return (
    <div className="footer">
      {remainingItems >= 1 ? (
        <p>You have {remainingItems} item(s) in your cart.</p>
      ) : (
        <p>You don't have any item in your cart</p>
      )}
      ;
    </div>
  );
}

export default App;
