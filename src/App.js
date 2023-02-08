import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import List from './List';
import ModalUpdate from './ModalUpdate';
import ModalDelete from './ModalDelete';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { db } from './firebase';


function App() {
  
  // const [idCounter, setIdCounter] = useState(3)

  const [datas, setDatas] = useState([])


  

  //read 
  useEffect(() => {
    onValue(ref(db, "contact"), (snapshot) => {
      setDatas([]);
      const data = snapshot.val();
      console.log(`log data : `)
      console.log(data);
      if(data !== null){
        Object.values(data).map((contact) => {
          setDatas((oldArray) => [...oldArray, contact]);
        })
      }
    })
  },[]);

  //write
  const [inputData, setInputData] = useState({
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
      // const newData = [...datas,inputData];
      const uuid = uid();
      const newData = {
        uuid,
        ...inputData
      };
      console.log("newData", newData);
      
      set(ref(db, `contact/${uuid}`), newData);
      document.getElementById("contact-list-form").reset();    
      // setDatas(newData);
      setInputData({
        name : "",
        email : "",
        telp : ""
      })
  }

  //Update Section
  const [dataUpdate, setDataUpdate] = useState({
    uuid : null,
    email : null,
    name : null,
    telp : null
  });
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = (uuid) => {
    let updateUuid = uuid;
    console.log("updateUuid",updateUuid);
    const data = datas.find(obj => obj.uuid === updateUuid);
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
    // let newData = datas
    // for(let i=0;i<newData.length;i++){
    //   if(newData[i].uuid == dataUpdate.uuid){
    //     newData[i] = dataUpdate
    //     break
    //   }
    // }
    //   setDatas(newData);
      update(ref(db, `/contact/${dataUpdate.uuid}`), dataUpdate);
      setShowUpdate(false)
  }



  //Delete Section
  const [dataDelete, setDataDelete] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (uuid) => {
    setDataDelete(uuid)
    setShowDelete(true)
  };

  const handleDeleteSubmit = (uuid) => {
    console.log("run");
    // let newData = datas
    // for(let i=0;i<newData.length;i++){
    //   if(newData[i].uuid == uuid){
    //     newData.splice(i, 1);
    //     break
    //   }
    // }
    //   setDatas(newData);
    remove(ref(db, `contact/${uuid}`));
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