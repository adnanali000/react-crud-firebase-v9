import React,{useState,useEffect} from 'react';
import {fireDb} from '../firebase';
import {collection,getDocs,deleteDoc,doc} from 'firebase/firestore';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify'
import './Home.css';

const Home = () => {
    const [data,setData] = useState([]);
    

     //firebase db collections
     const contactsCollectionRef = collection(fireDb,"contacts");

    useEffect(()=>{
        const getData = async ()=>{
            const contactData = await getDocs(contactsCollectionRef);
            setData(contactData.docs.map((doc)=>({...doc.data(),id:doc.id})));
        }
        getData();
    },[])

    //delete function
    const handleDelete = async (id)=>{
        const contactDoc = doc(fireDb,"contacts",id);
        if(window.confirm("Are you sure that you wanted to delete that contact ?")){
            try{
                await deleteDoc(contactDoc);
                toast.success("contact deleted successfully");  
            }catch(err){
                toast.error(err);
            }
        }
    }

    return (
        <div style={{marginTop:'100px'}}>
            <table className='styled-table'>
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
                                    {/* <th scope="row">{index+1}</th> */}
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

            </table>
          
        </div>
    )
}

export default Home
