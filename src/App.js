import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumpster } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faDumpster);

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

  function handleDelete(id) {
      setcarts((prevcart) => prevcart.filter((cart) => cart.id !== id))
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
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
      <Footer carts={carts}/>
    </>
  );
}

function TodoItem({ cart, onCross, onDelete }) {
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
        <FontAwesomeIcon icon="fa-solid fa-dumpster" className="bin-icon" onClick={() => onDelete(cart.id)}/>
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
  const remainingItems = carts.filter((cart) => !cart.selected);
  console.log(carts.count);
  return (
    <div className="footer">
      {remainingItems.length >= 1 ? (
        <p>You have {remainingItems.length} item(s) in your cart.</p>
      ) : (
        <p>You don't have any item in your cart</p>
      )}
      ;
    </div>
  );
}

export default App;
