import React, { useState, useEffect } from 'react';
import { fireDb } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link,Router } from 'react-router-dom';
import { toast } from 'react-toastify'
import './Home.css';
import MaterialTable from 'material-table';

const Home = () => {
    const [data, setData] = useState([]);

    const columns = [
        { title: 'Name', field: 'name', align: "left", defaultSort: 'asc', filterPlaceholder: 'Search by name' },
        { title: 'Email', field: 'email', align: "left", sorting: false, filtering: false },
        { title: 'Contact', field: 'contact', sorting: false, align: "left", emptyValue: () => <em>null</em> },
    ]

    // const [dummy,setDummy] = useState([]);


    //firebase db collections
    const contactsCollectionRef = collection(fireDb, "contacts");

    useEffect(() => {
        const getData = async () => {
            const contactData = await getDocs(contactsCollectionRef);
            setData(contactData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getData();
    }, [])

    // useEffect(()=>{
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(response => response.json())
    //     .then(result => setDummy(result))
    //     .catch(error => console.log(error))
    // },[])


    //delete function
    const handleDelete = async (id) => {
        const contactDoc = doc(fireDb, "contacts", id);
        if (window.confirm("Are you sure that you wanted to delete that contact ?")) {
            try {
                await deleteDoc(contactDoc);
                toast.success("contact deleted successfully");
            } catch (err) {
                toast.error(err);
            }
        }
    }

    return (
        <div style={{ marginTop: '100px' }}>

            <MaterialTable
                columns={columns}
                data={data}
                editable={{
                    onRowAdd: () => alert('hello world')
                }}
                actions={[

                    rowData =>({
                        icon: () => <Link to={`/update/${rowData.id}`}><i class="fas fa-pen" style={{color:'black',fontSize:'20px'}}></i></Link>,
                        tooltip:'Edit',
                        onClick:(rowData),
                    }),

                    rowData =>({
                        icon: 'delete',
                        tooltip:'delete',
                        onClick: () => handleDelete(rowData.id),
                    }),

                    rowData =>({
                        icon: () => <Link to={`/view/${rowData.id}`}><i class="fas fa-eye" style={{color:'black',fontSize:'20px'}}></i></Link>,
                        tooltip:'View',
                        onClick:(rowData),
                    }),

                   
                ]}

                options={{
                    actionsColumnIndex: -1,
                    sorting: true,
                    filtering: true,
                    pageSizeOptions: [5, 10, 15, 20, 25, 50],
                    pageSize: 5,
                    paginationType: 'stepped',
                    showFirstLastPageButtons: false,
                    paginationPosition: 'both',
                    // exportButton:true,
                    // exportAllData:true,
                    // exportFileName:'contact data',



                }}
                title='Contact Data'
            />

            {/* <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{textAlign:'center'}}>No.</th>
                        <th style={{textAlign:'center'}}>Name</th>
                        <th style={{textAlign:'center'}}>Email</th>
                        <th style={{textAlign:'center'}}>Contact</th>
                        <th style={{textAlign:'center'}}>Action</th>
                    </tr>
                </thead>
                    <tbody>
                        {data.map((user,index)=>{
                            return(
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.contact}</td>
                                    <td>
                                        <Link to={`/update/${user.id}`}>
                                            <button className="btn btn-edit">Edit</button>
                                        </Link>

                                        <button 
                                        className="btn btn-delete" 
                                        onClick={()=>handleDelete(user.id)}>
                                            Delete
                                        </button>

                                        <Link to={`/view/${user.id}`}>
                                            <button className="btn btn-view">View</button>
                                        </Link>
                                        
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

            </table> */}



            {/* <table>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>username</th>
                    <th>email</th>
                </tr>
                {
                    dummy && dummy.length > 0 ?
                    dummy.map(user => 
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>    

                    ): 'Loading'
                }
            </table> */}



        </div>
    )
}

export default Home
