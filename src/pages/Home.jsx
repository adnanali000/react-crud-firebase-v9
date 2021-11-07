import React,{useState,useEffect} from 'react';
import {fireDb} from '../firebase';
import {collection,getDocs} from 'firebase/firestore';
import {Link} from 'react-router-dom';
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
                                </tr>
                            )
                        })}
                    </tbody>

            </table>
          
        </div>
    )
}

export default Home
