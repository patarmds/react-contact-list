import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import List from './List';
import ModalUpdate from './ModalUpdate';
import ModalDelete from './ModalDelete';

function App() {
  
  const [idCounter, setIdCounter] = useState(3)

  const [datas, setDatas] = useState([
    {
      id : 1,
      name : "stevan",
      email : "stevan@gmail.com",
      telp : "0812"
    },
    {
      id : 2,
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
    console.log("idCounter",idCounter);
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
      setDatas(newData);
      setIdCounter(parseInt(idCounter) + 1);
      setInputData({
        id : idCounter+1,
        name : "",
        email : "",
        telp : ""
      })
    }
  }

  //Update Section
  const [dataUpdate, setDataUpdate] = useState({
    id : null,
    email : null,
    name : null,
    telp : null
  });
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = (id) => {
    let updateId = parseInt(id);
    console.log("updateId",updateId);
    const data = datas.find(obj => obj.id === updateId);
    console.log(data);
    setDataUpdate(data)
    setShowUpdate(true)

  };

  const handleUpdateChange = (event) => {
    console.log("Lama", datas)
    // console.log(event.target.name)
    
    let formData = {...dataUpdate}
    
    console.log("Baru", datas)
    formData[event.target.name] = event.target.value
    console.log(formData);
    
    setDataUpdate(formData);
  }

  const handleUpdateSubmit = () => {
    console.log("run");
    let newData = datas
    for(let i=0;i<newData.length;i++){
      if(newData[i].id == dataUpdate.id){
        newData[i] = dataUpdate
        break
      }
    }
      setDatas(newData);
      setShowUpdate(false)
  }



  //Delete Section
  const [dataDelete, setDataDelete] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setDataDelete(id)
    setShowDelete(true)
  };

  const handleDeleteSubmit = (id) => {
    console.log("run");
    let newData = datas
    for(let i=0;i<newData.length;i++){
      if(newData[i].id == id){
        newData.splice(i, 1);
        break
      }
    }
      setDatas(newData);
      setShowDelete(false)
  }


  return (
    <>
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
        <List data={datas} handlerUpdate={handleShowUpdate} handlerDelete={handleShowDelete}></List>
      </Row>
    </Container>
    <ModalUpdate 
      isShow={showUpdate} 
      handleClose={handleCloseUpdate} 
      data={dataUpdate} 
      handleChange={handleUpdateChange} 
      handleSubmit={handleUpdateSubmit}></ModalUpdate>
    <ModalDelete 
      isShow={showDelete} 
      handleClose={handleCloseDelete}
      handleDelete={handleDeleteSubmit}
      id={dataDelete} 
      ></ModalDelete>
    </>
  );
}

export default App;