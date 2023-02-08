import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';



function List({data, handlerUpdate , handlerDelete}) {

  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Telp</th>
        </tr>
      </thead>
      <tbody>
        {data.map((result, index) => {
            return (<tr key={result.uuid}>
                <td>{result.uuid}</td>
                <td>{result.name}</td>
                <td>{result.email}</td>
                <td>{result.telp}</td>
                <td><Button variant="primary" data-id={result.uuid} onClick={() => handlerUpdate(result.uuid)}>Edit</Button></td>
                <td><Button variant="danger"  data-id={result.uuid} onClick={() => handlerDelete(result.uuid)}>Delete</Button></td>
            </tr>)
        })}
      </tbody>
    </Table>
    </>
  );
}

export default List;