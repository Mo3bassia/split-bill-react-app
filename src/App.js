import { useState } from "react";
import "./index.css";

export default function App() {
  const [friends, setFriends] = useState([
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
  ]);

  const [isOpen, setIsOpen] = useState();

  return (
    <>
      <div className="app">
        <aside className="sidebar">
          <Friends isOpen={isOpen} setIsOpen={setIsOpen} friends={friends} />
          <AddFriend setFriends={setFriends} friends={friends} />
        </aside>
        {isOpen && (
          <SplitBill
            isOpen={isOpen}
            friends={friends}
            setIsOpen={setIsOpen}
            setFriends={setFriends}
          />
        )}
      </div>
      <Footer></Footer>
    </>
  );
}

function SplitBill({ isOpen, friends, setFriends, setIsOpen }) {
  let currentFriend = friends.filter((friend) => friend.id === isOpen)[0];
  let currentFriendIndex = friends.indexOf(currentFriend);
  const [bill, setBill] = useState(0);
  const [myExpense, setMyExpense] = useState(0);
  const [selected, setSelected] = useState("you");
  let friendExpense = bill - myExpense;

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleCalculate() {
    if (selected === "you") {
      setFriends(
        friends.map((friend, index) => {
          if (index === currentFriendIndex) {
            return { ...friend, balance: friend.balance + friendExpense };
          } else {
            return { ...friend };
          }
        })
      );
      setIsOpen();
    } else {
      setFriends(
        friends.map((friend, index) => {
          if (index === currentFriendIndex) {
            return { ...friend, balance: friend.balance - myExpense };
          } else {
            return { ...friend };
          }
        })
      );
      setIsOpen();
    }
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH {currentFriend.name}</h2>
      <label htmlFor="bill">💰 Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
        id="bill"
      ></input>
      <label htmlFor="yourExpense">🧍‍♀️ Your expense</label>
      <input
        type="number"
        id="yourExpense"
        value={myExpense}
        onChange={(e) =>
          +bill >= e.target.value && setMyExpense(+e.target.value)
        }
      ></input>
      <label htmlFor="FriendExpense">👫 {currentFriend.name}'s expense</label>
      <input
        type="number"
        id="FriendExpense"
        readOnly
        disabled
        value={friendExpense}
      ></input>
      <label htmlFor="selectBox">🤑 Who is paying the bill</label>
      <select
        id="selectBox"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="you">You</option>
        <option value={currentFriend.name}>{currentFriend.name}</option>
      </select>
      <Button onClick={handleCalculate}>Split Bill</Button>
    </form>
  );
}

function Friends({ isOpen, setIsOpen, friends }) {
  return (
    <ul>
      {friends.map((friend, index) => (
        <Friend
          index={index}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
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

function AddFriend({ setFriends, friends }) {
  const [url, setUrl] = useState("https://i.pravatar.cc/48");
  const [name, setName] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  function handleClick() {
    if (name !== "") {
      setFriends([
        ...friends,
        { id: friends.length + 1, name: name, image: url, balance: 0 },
      ]);
      setToggleBtn(false);
    }
  }

  return (
    <>
      {toggleBtn && (
        <form className="form-add-friend" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="friendName">👫 Friend name</label>
          <input
            id="friendName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label htmlFor="imageUrl">🌄 Image URL</label>
          <input
            type="url"
            id="imageUrl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
          <Button onClick={handleClick}>Add</Button>
        </form>
      )}

      <Button onClick={() => setToggleBtn(!toggleBtn)}>
        {!toggleBtn ? "Add Friend" : "Close "}
      </Button>
    </>
  );
}

function Friend({ id, name, image, balance, isOpen, setIsOpen, index }) {
  function handleClick() {
    if (isOpen === id) setIsOpen("");
    else setIsOpen(id);
  }

  return (
    <li>
      <img src={image} alt={name}></img>
      <h3>{name}</h3>
      {balance > 0 ? (
        <p className="green">
          {name} owes you <span className="bold">{balance}</span>€
        </p>
      ) : balance === 0 ? (
        <p>You and {name} are even</p>
      ) : (
        <p className="red">
          You owe {name} <span className="bold">{Math.abs(balance)}</span>€
        </p>
      )}
      <Button onClick={handleClick}>
        {isOpen === id ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        Made with ❤️ by{" "}
        <a href="https://github.com/Mo3bassia" target="_blank">
          Mo3bassia
        </a>
      </p>
      <p>
        Built using <strong>React</strong>. Feel free to explore and connect!
      </p>
    </footer>
  );
}
