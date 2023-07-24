import engage from "./engage";

function App() {
  
  const handleClick = async () => {

    await engage.events.send({
      type: 'test',
      hello: 'world'

    })
  };

  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
      <p>Click the button to send an event</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;
