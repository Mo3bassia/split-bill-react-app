import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <Friends />
        <AddFriend />
        <Button>Add Friend</Button>
      </aside>
      <SplitBill />
    </div>
  );
}

function SplitBill() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH ANTHONY</h2>
      <label htmlFor="bill">💰 Bill value</label>
      <input type="number" id="bill"></input>
      <label htmlFor="yourExpense">🧍‍♀️ Your expense</label>
      <input type="number" id="yourExpense"></input>
      <label htmlFor="anthonyExpense">👫 Anthony's expense</label>
      <input type="number" id="anthonyExpense" readOnly disabled></input>
      <label htmlFor="selectBox">🤑 Who is paying the bill</label>
      <select id="selectBox">
        <option value="you">You</option>
        <option value="Sarah">Sarah</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

function Friends() {
  return (
    <ul>
      {initialFriends.map((friend) => (
        <Friend
          key={friend.id}
          id={friend.id}
          name={friend.name}
          image={friend.image}
          balance={friend.balance}
        />
      ))}
    </ul>
  );
}

function AddFriend() {
  const [url, setUrl] = useState("https://i.pravatar.cc/48");
  return (
    <form className="form-add-friend">
      <label htmlFor="friendName">👫 Friend name</label>
      <input id="friendName"></input>
      <label htmlFor="imageUrl">🌄 Image URL</label>
      <input
        type="url"
        id="imageUrl"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function Friend({ id, name, image, balance }) {
  return (
    <li>
      <img src={image} alt={name}></img>
      <h3>{name}</h3>
      {balance > 0 ? (
        <p className="green">
          {name} owes you {balance}€
        </p>
      ) : balance === 0 ? (
        <p>You and {name} are even</p>
      ) : (
        <p className="red">
          You owe {name} {balance}€
        </p>
      )}
      <Button>Select</Button>
    </li>
  );
}

function Button({ onClick, children, onSubmiting }) {
  return (
    <button className="button" onClick={onClick} onSubmit={onSubmiting}>
      {children}
    </button>
  );
}
