import "./App.css";
import Client1 from "./components/Client1";
import Client2 from "./components/Client2";

function App() {
  return (
    <div className="App">
      <h1>WelCome Chat Application</h1>
      <div className="Clients">
        <Client1 />
        <Client2 />
      </div>
      <br />
    </div>
  );
}

export default App;
