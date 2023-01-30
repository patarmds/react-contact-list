import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import List from './List';

function App() {
  
  const [idCounter, setIdCounter] = useState(3)

  const [datas, setDatas] = useState([
    {
      name : "stevan",
      email : "stevan@gmail.com",
      telp : "0812"
    },
    {
      name : "patar",
      email : "patar@gmail.com",
      telp : "0812"
    },
  ])

  const [inputData, setInputData] = useState({
    id : idCounter,
    name : "",
    email : "",
    telp : ""
  });

  function handlerChange(event){
    console.log(event.target.name)
    let formData = inputData
    formData[event.target.name] = event.target.value
    setInputData(formData);
  }

  function handlerSubmit(){
    console.log("asd");
    let error = false;
    let errorKey = "";
    Object.keys(inputData).forEach(key => {
      console.log(key, inputData[key]);
      if(inputData[key] === ""){
        error = true
        errorKey = errorKey + key + ",";
      }
    });

    if(error){
      alert(`isi data ${errorKey} bro`)
    }else{
      const newData = [...datas,inputData];
      document.getElementById("contact-list-form").reset();
      setInputData({
        name : "",
        email : "",
        telp : ""
      })
      
      setDatas(newData);
      setIdCounter(idCounter + 1);
    }

    
  }



  return (
    <Container>
      <Row>
        <Form id="contact-list-form">
          
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Name" onChange={(e) => handlerChange(e) } />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="text" placeholder="Email" onChange={(e) =>  handlerChange(e) } />
          </Form.Group>

          <Form.Group className="mb-3" controlId="telp">
            <Form.Label>Telp</Form.Label>
            <Form.Control name="telp" type="text" placeholder="Telp" onChange={(e) =>  handlerChange(e) } />
          </Form.Group>
          <Button variant="primary" type="button" onClick={() => handlerSubmit()}>
            Submit
          </Button>

        </Form>
      </Row>
      <Row>
        <List data={datas}></List>
      </Row>
    </Container>

  );
}

export default App;