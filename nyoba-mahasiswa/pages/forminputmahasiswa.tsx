import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Table, Button, Card, NavDropdown } from 'react-bootstrap';
import { PencilSquare, Trash, User } from 'react-bootstrap-icons';
// import { RiUserFill } from 'react-bootstrap-icons';
import SidebarMenu from 'react-bootstrap-sidebar-menu';




 
 const koneksiMahasiswa = axios.create({
  
  baseURL: "http://127.0.0.1:5000/api/mahasiswa" 
});


export default function FormMahasiswa() {
    const [statenama, setNama] = useState("");
    const [statenim, setNim] = useState("");
    const [statetanggal, setTanggal] = useState("2018-07-22");
    const [statealamat, setAlamat] = useState("");
    const [statefoto, setFoto] = useState("");
    const [mahasiswa, setMahasiswa] =  useState(null);
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
     
    const [stateedit,setEdit]=useState("hide");

     
    
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
   
  const handleSubmitAdd =  (event) => {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiMahasiswa
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
     
 }
 const handleSubmitEdit =  (event) => {
    
  event.preventDefault();
  const address = "/"+event.target.nim.value;
  alert(address);
  //const formData = new FormData(event.target);
  const formData = {
    nim: event.target.nim.value,
    nama: event.target.nama.value,
    foto: event.target.foto.value,
    alamat: event.target.alamat.value,
    tanggal_lahir: event.target.tanggal_lahir.value
}
  alert(formData);
  koneksiMahasiswa
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
   
}
  const handleAdd = (event) => {
    
     setAdd("show");
     setbtnAdd("hide");
     setEdit("hide");
 
      
  }
  const handleCancelAdd = (event) => {
    
     setAdd("hide");
     setbtnAdd("show");
     setEdit("hide");
 
      
  }
  const handleCancelEdit = (event) => {
    
    setAdd("hide");
    setbtnAdd("show");
    setEdit("hide");
    setNama("");
    setNim("");
    setAlamat("");
    setTanggal(formatDate("2018-07-22"));
    setFoto("");
     
 }
 const handleFotoChange = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result;
      setFoto(imageDataUrl);
    };
    reader.readAsDataURL(file);
  } else {
    setFoto(''); // Reset foto jika tidak ada file yang dipilih
  }
};

const handleSubmitForm = (event) => {
  event.preventDefault();
  handleSubmitEdit(event);
  handleFotoChange(event);
};


   const handleDelete = (event) => {
            event.preventDefault();
            var nim = event.target.value;
            koneksiMahasiswa.delete(`/${nim}`)
              .then(response => {
                console.log('Data berhasil dihapus:', response.data);
                setMahasiswa(
                  mahasiswa.filter((mahasiswa) => {
                     return mahasiswa.nim !== nim;
                  }))
             
                // Lakukan langkah-langkah lain setelah penghapusan data
              })
              .catch(error => {
                console.error('Gagal menghapus data:', error);
              })
          }

      const handleEdit = (event) => {
            event.preventDefault();
            var nim = event.target.value;
            
               const mhsEdit =  mahasiswa.filter((mahasiswa) => {
                     return mahasiswa.nim == nim;
                  });
                  if(mhsEdit!=null){

                    setNama(mhsEdit[0].nama);
                    setNim(mhsEdit[0].nim);
                    setAlamat(mhsEdit[0].alamat);
                    setTanggal(formatDate(mhsEdit[0].tanggal_lahir));
                    setFoto(mhsEdit[0].foto);
                    setAdd("hide");
                    setbtnAdd("show");
                    setEdit("show");

                  }
          }
  useEffect(() => {
      async function getMahasiswa() {
        const response = await koneksiMahasiswa.get("/").then(function (axiosResponse) {
            setMahasiswa(axiosResponse.data.data); 
     
         })
         .catch(function (error) {   
          alert('error from mahasiswa in api mahasiswa: '+error);
         });;
          }
      getMahasiswa();
    }, []);
  
   
if(mahasiswa==null){
return(
  <div>
    waiting...
  </div>
)
}else{

  return (
    <div class="main-content">
    <br/>
     <Button id="btnadd" onClick={handleAdd} className={`btn $statebutonadd`}>add</Button>
     <div className="row">
      <div className="col-md-6">
        <Form id="formadd" className={stateadd} onSubmit={handleSubmitAdd}>
          <Form.Group className="mb-3" controlId="nim">
            <Form.Label>NIM</Form.Label>
            <Form.Control
              type="text"
              name="nim"
              placeholder="Nim Mahasiswa"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="nama">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              name="nama"
              placeholder="Nama Mahasiswa"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="foto">
            <Form.Label>Foto</Form.Label>
            <Form.Control type="file" name="image" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="tanggal_lahir">
            <Form.Label>Tanggal lahir</Form.Label>
            <Form.Control type="date" name="tanggal_lahir" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="alamat">
            <Form.Label>Alamat</Form.Label>
            <Form.Control
              type="text"
              name="alamat"
              placeholder="Alamat Mahasiswa"
            />
          </Form.Group>

          <Button as="input" type="submit" value="Submit" />{' '}
          <Button
            as="input"
            type="reset"
            value="Cancel"
            onClick={handleCancelAdd}
            variant="danger"
          />
          
        </Form>
    </div>
    </div>  
    
    {/* <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd} >
        <table border={0}>
            <tbody>
            <tr>
            <td> <label> nim:</label></td>
            <td><input type="text" id="nim" name="nim"/>
              
              </td>
        </tr>
        <tr>
            <td>  <label> nama:</label></td>
            <td><input type="text" id="nama"   name="nama" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>   <input
                    type="file" name="image"/>  </td>
        </tr>
        <tr>
            <td>  <label> Tanggal Lahir:</label></td>
            <td>  <input type="date" name="tanggal_lahir"
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}}  name="alamat" ></textarea></td>
        </tr>
            </tbody>
          </table>
          <input type="submit" />
          <input type="button" value="cancel" onClick={handleCancelAdd} />
          </form>   */}
    <div className="row">
    <div className="col-md-6">       
    <Form id="formedit" className={stateedit} onSubmit={handleSubmitForm}>
    <Form.Group controlId="nim">
      <Form.Label>NIM</Form.Label>
      <Form.Control
        type="text"
        value={statenim}
        name="nim"
        // onChange={(e) => setNim(e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="nama">
      <Form.Label>Nama</Form.Label>
      <Form.Control
        type="text"
        value={statenama}
        name="nama"
        onChange={(e) => setNama(e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="foto">
    <Form.Label>Foto</Form.Label>
    <br />
    {statefoto && <img src={statefoto} width="80" alt="Foto" className="mt-2" />}
    <Form.Control
      type="file"
      name="image"
      onChange={handleFotoChange}
    />
  </Form.Group>

    <Form.Group controlId="tanggal_lahir">
      <Form.Label>Tanggal Lahir</Form.Label>
      <Form.Control
        type="date"
        value={statetanggal}
        name="tanggal_lahir"
        onChange={(e) => setTanggal(e.target.value)}
        min="1970-01-01"
        max="2025-12-31"
      />
    </Form.Group>

    <Form.Group controlId="alamat">
      <Form.Label>Alamat</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={statealamat}
        name="alamat"
        onChange={(e) => setAlamat(e.target.value)}
      />
    </Form.Group>
            <br/>
    <Button type="submit">Submit</Button> {' '}
    <Button type="button" onClick={handleCancelEdit} variant="danger">
      Cancel
    </Button>
  </Form>
  </div>
</div>


        <br/>
     
    Daftar Mahasiswa hasil get Local Nodejs
    {/* <div className="table-responsive" style={{ width: '60%' }} >
        <Table striped bordered hover>
            <thead>
            <tr>
            <td style={{ width: '10%' }}><center><b>Nim</b></center></td> 
            <td style={{ width: '25%' }}><center><b>Nama</b></center></td>
            <td style={{ width: '15%' }}><center><b>Foto</b></center></td>
            <td style={{ width: '10%' }}><center><b>Tanggal Lahir</b></center></td>
            <td style={{ width: '20%' }}><center><b>Alamat</b></center></td>
            <td colSpan={2}><center><b>Action</b></center></td>
            </tr>
            </thead>
            <tbody>
            {mahasiswa.map((mhs) => 
                <tr>
                    <td>{mhs.nim}</td>
                    <td>{mhs.nama}</td>
                    <td><img src={mhs.foto} width="80"/></td>
                    <td>{mhs.tanggal_lahir}</td>
                    <td>{mhs.alamat}</td>
                    <td><Button onClick={handleEdit} value={mhs.nim}><PencilSquare /> Edit</Button></td>
                    <td><Button onClick={handleDelete} value={mhs.nim} variant="danger"><Trash /> Delete</Button></td>
                </tr>
           )}     
                   </tbody>
          </Table>
    </div>    */}
            {/* <div className="card-container">
          {mahasiswa.map((mhs) => (
            <div className="card">
              <img src={mhs.foto} alt="Foto Mahasiswa" />
              <h3>{mhs.nama}</h3>
              <p>NIM: {mhs.nim}</p>
              <p>Tanggal Lahir: {mhs.tanggal_lahir}</p>
              <p>Alamat: {mhs.alamat}</p> <br/>
              <div className="card-actions">
                <Button onClick={handleEdit} value={mhs.nim}>
                  <PencilSquare /> Edit
                </Button>
                <Button onClick={handleDelete} value={mhs.nim} variant="danger">
                  <Trash /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div> */}
      

            <div className="card-container" style={{ width: '60%' }}>
              {mahasiswa.map((mhs) => (
                <Card>
                  <Card.Img variant="top" src={mhs.foto} alt="Foto Mahasiswa" />
                  <Card.Body>
                    <Card.Title>{mhs.nama}</Card.Title>
                    <Card.Text>
                      <p>NIM: {mhs.nim}</p>
                      <p>Tanggal Lahir: {mhs.tanggal_lahir}</p>
                      <p>Alamat: {mhs.alamat}</p> 
                    </Card.Text> <br/>
                    <div className="card-actions">
                      <Button onClick={handleEdit} value={mhs.nim}>
                        <PencilSquare /> Edit
                      </Button>
                      <Button onClick={handleDelete} value={mhs.nim} variant="danger">
                        <Trash /> Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
           
            
        )
}
  
  }