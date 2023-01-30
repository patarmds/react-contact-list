import Table from 'react-bootstrap/Table';



function List({data}) {

  return (
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
            return (<tr>
                <td>{index}</td>
                <td>{result.name}</td>
                <td>{result.email}</td>
                <td>{result.telp}</td>
                <td><button type="button" dataId={result.id} >Edit</button></td>
                <td><button type="button" dataId={result.id} >Hapus</button></td>
            </tr>)
        })}
      </tbody>
    </Table>
  );
}

export default List;