import { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';

function App() {
  const [errors, setErrors] = useState("");
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [currentInput, setCurrentInput] = useState("");

  const [todos, setTodos] = useState([]);
  const [message, setMsg] = useState("Connect Meta Mask");


  const contractAddress = "0x24E52D3cB1699DCB89bFcda493a752b35a91f869";
  const contractAbi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_task",
          "type": "string"
        }
      ],
      "name": "addTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "taskCompleted",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllTask",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint128",
              "name": "id",
              "type": "uint128"
            },
            {
              "internalType": "bool",
              "name": "isComplete",
              "type": "bool"
            },
            {
              "internalType": "string",
              "name": "task",
              "type": "string"
            }
          ],
          "internalType": "struct todo.Task[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getTask",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint128",
              "name": "id",
              "type": "uint128"
            },
            {
              "internalType": "bool",
              "name": "isComplete",
              "type": "bool"
            },
            {
              "internalType": "string",
              "name": "task",
              "type": "string"
            }
          ],
          "internalType": "struct todo.Task",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  function changeHandler(event) {
    setCurrentInput(event.target.value);
  }
  useEffect(() => {
    console.log(signer)
  }, [provider, contract, signer])
  const connectMetamask = () => {
    if (window.ethereum) {
      try {
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(tempProvider)
        const tempSigner = tempProvider.getSigner()
        setSigner(tempSigner)

        const tempContract = new ethers.Contract(contractAddress, contractAbi, tempSigner)
        setContract(tempContract)

        setMsg("Wallet Connected")
      } catch (e) {
        console.log(e)
      }
    } else {
      setErrors("Install Metamask")
    }
  }

  async function getAllTask() {
    let result = await contract.getAllTask();
    setTodos(result);
  }
  function sendTodo() {
    const tx = contract.addTask(currentInput);
    console.log(tx);
    console.log(signer)
    console.log(contract)
  }
  function taskComplete(event){
    var num = parseInt(event.target.value)+1
    console.log(num)
    const tx= contract.taskCompleted(num)
    console.log(tx)
  }
  return (
    <>
      <div id='mainContainer'>
        <h1 id='appname'>Todo Dapp</h1>
        <div id='inputBox'>
          <input id='task' type="text" onChange={changeHandler}></input>
          <button id='inputButton' onClick={sendTodo}>+</button>
        </div>
        <div>
          {
            todos.map((val, index) => {
              if (val[1] === false) {
                return (
                  <div className='listItem'>
                    <p key={index}>{val[2]}</p>
                    <button className='listButton' value={index} onClick={taskComplete}>X</button>
                  </div>
                )
              } else {
                return (
                  <div className='listItem'>
                    <p style={{ textDecoration: "line-through" }} key={index}>{val[2]}</p>
                    <button className='listButton' value={index} onClick={taskComplete}>X</button>
                  </div>
                )
              }
            })
          }
        </div>
        <div id='accountControl'>
          <button id='connectButton' onClick={connectMetamask}>{message}</button>
          <button id='connectButton' onClick={getAllTask}>Get All Task</button>
        </div>
        <div>{errors}</div>
      </div>
    </>
  );
}

export default App;