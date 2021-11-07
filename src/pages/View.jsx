import React,{useState,useEffect} from 'react';
import { fireDb } from '../firebase';
import {collection,getDoc,doc} from 'firebase/firestore';
import { useParams, useNavigate , Link} from 'react-router-dom';
import './View.css';
import { toast } from 'react-toastify';

const View = () => {
    const [user,setUser] = useState([]);

    const {id} = useParams();


    
    useEffect(()=>{
        const getData = async () =>{
            const userData = await getDoc(doc(fireDb, "contacts", id)).then(docSnap => {
                if (docSnap.exists()) {
                  setUser(docSnap.data());
                } else {
                  toast.error("no data found");
                }
              })     
        }
       getData();
    },[id])

    return (
        <div style={{marginTop:'150px'}}>
            <div className="card">
                <div className="card-header">
                    <p>User Contact Detail</p>
                </div>
                <div className="container">
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />

                    <strong>Name:</strong>
                    <span>{user.name}</span>
                    <br />
                    <br />

                    <strong>Email:</strong>
                    <span>{user.email}</span>
                    <br />
                    <br />

                    <strong>Contact:</strong>
                    <span>{user.contact}</span>
                    <br />
                    <br />

                    <Link to="/">
                        <button className="btn btn-edit">Go Back</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default View
