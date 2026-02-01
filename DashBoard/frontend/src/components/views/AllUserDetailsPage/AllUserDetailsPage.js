import React, {useEffect, useState} from "react";
import Axios from "axios";
import {useHistory, withRouter} from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import GeneratePdf from "./AllUserReport";

function AllUserDetailsPage() {

    const [AllUsers, setAllUsers] = useState([]);
    const history = useHistory();
    const[filter,setFilter] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:5001/api/users/getAllUsers')
            .then(response => {
                console.log(response.data);
                setAllUsers(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[])

    async function deletePayment(item) {
        console.log(item.ID);
        // alert("Are you want to Delete ?");
        if(window.confirm('Delete the User?')){await Axios.delete(`http://localhost:5001/api/users/deleteUser/${item._id}`).then((res)=>{
            console.log(res)

        });};

    }

    return(
        <div style={{ width: '98%', margin: '6rem auto' }}>
            <div>
                <h1 style={{ textAlign: 'left' }}>  All Users </h1>
            </div>
            <div>
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Search"
                />
            </div>
            <hr/>
            <div style={{ width:'98%',  margin: '4rem auto'}}>
                <table>
                    <thead>
                    <tr style={{backgroundColor:'#4682b4'}}>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course (Registered/Assigned)</th>
                        <th>Contact Number</th>
                        <th>Gender</th>
                        <th>Role</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {AllUsers.filter(AllUsers => !filter.length || AllUsers.UserID.toString().toLowerCase().includes(filter.toString().toLowerCase()) || AllUsers.name.toString().toLowerCase().includes(filter.toString().toLowerCase()) || AllUsers.registeredCourse.toString().toLowerCase().includes(filter.toString().toLowerCase())).map((item,key)=>{

                            return(
                            <tr key = {key}>
                                <td>
                                    <center>{item.UserID}</center>
                                </td>
                                <td>
                                    <center>{item.name}</center>
                                </td>
                                <td>
                                    <center>{item.email}</center>
                                </td>
                                <td>
                                    <center>{item.registeredCourse}</center>
                                </td>
                                <td>
                                    <center>{item.contactNumber}</center>
                                </td>
                                <td>
                                    <center>{item.Gender}</center>
                                </td>
                                <td>
                                    <center>{item.Role}</center>
                                </td>
                                <td><center><button style={{backgroundColor:'#ff9800'}} onClick={() => {history.push({pathname: "/AllUsersUpdate", state:{user:item}})}} ><FaEdit /></button></center></td>
                                <td><center><button style={{backgroundColor:'red'}} onClick={() => {deletePayment(item); window.location.reload()}}><FaTrashAlt /></button></center></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            <hr/>
            <button style={{marginLeft: '1000px',backgroundColor:'#4682b4',color:'white'}} onClick={() => GeneratePdf(AllUsers.filter(AllUsers => AllUsers.Role != "Admin"))}>Generate Report</button>

        </div>
    )
}

export default AllUserDetailsPage;