import './App.css';

function App() {
  return (
    <>
      <div>
        <h1>Todo Dapp</h1>
        <div>
          <input type="text"></input>
          <button>+</button>
        </div>
        <div>
          <div className='listItem'>
            <li>home</li>
            <button className='listButton'>X</button>
          </div>
          <div className='listItem'>
            <li>home</li>
            <button className='listButton'>X</button>
          </div>
          <div className='listItem'>
            <li>home</li>
            <button className='listButton'>X</button>
          </div>
          <div className='listItem'>
            <li>home</li>
            <button className='listButton'>X</button>
          </div>
          <div className='listItem'>
            <li>home</li>
            <button className='listButton'>X</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
