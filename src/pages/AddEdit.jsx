import React , {useState,useEffect} from 'react';
import { useNavigate, useParams} from 'react-router-dom'; 
import './AddEdit.css';
import {fireDb} from '../firebase';
import {collection,addDoc} from 'firebase/firestore'
import {toast} from 'react-toastify'

const initialState = {
    name: "",
    email: "",
    contact : ""
}

const AddEdit = () => {
    const [state,setState] = useState(initialState);
    const [data,setData] = useState({});

    //destructure
    const {name , email , contact} = state;

    //firebase db collections
    const contactsCollectionRef = collection(fireDb,"contacts");

    //hsitory reference
    const navigate = useNavigate();

    //on change functions

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({...state,[name]:value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //check empty field
        if(!name || !email || !contact){
            toast.error("Please provide value in each input field");
        }
        //add data in firebase firestore database
        else{
           try{
               await addDoc(contactsCollectionRef,state);
               toast.success("contact added successfully")
               setTimeout(()=> navigate('/'),500);
           }catch(err){
                toast.error(err)
           }
            
        }
    };

    return (
        <div style={{marginTop:'100px'}}>
            <form 
            style={{
                margin:'auto',
                maxWidth:'400px',
                padding: '15px',
                alignContent: 'center'
                
                }}
                autoComplete="off"

                onSubmit={handleSubmit}
            >

                <label htmlFor="name">Name</label>
                <input 
                type="text"
                id="name"
                name="name"
                placeholder="Your Name.."
                value={name}
                onChange={handleInputChange} 
                />

                <label htmlFor="email">Email</label>
                <input 
                type="email"
                id="email"
                name="email"
                placeholder="Your Email.."
                value={email}
                onChange={handleInputChange} 
                />

                <label htmlFor="contact">Contact</label>
                <input 
                type="number"
                id="contact"
                name="contact"
                placeholder="Your Contact No. .."
                value={contact}
                onChange={handleInputChange} 
                />

                <input type="submit" value="save" />

            </form>
        </div>
    )
}

export default AddEdit
