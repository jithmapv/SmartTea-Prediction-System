import React, {useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import Axios from "axios";
import {useLocation} from "react-router-dom";



function UpdatePayments(props) {

    const [ID,setID] = useState("");
    const [UserID,setUserID] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [registeredCourse, setRegisteredCourse] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");

    let [paymentsDate, setPaymentDate] = useState("");

    const location = useLocation();

    useEffect(() =>{
        setID(location.state.user._id)
        setUserID(location.state.user.UserID)
        setName(location.state.user.name)
        setEmail(location.state.user.email)
        setRegisteredCourse(location.state.user.registeredCourse)
        setContactNumber(location.state.user.contactNumber)
        setGender(location.state.user.Gender)
        setRole(location.state.user.Role)
    },[location])


    const onUserIDChange = (event) => {
        setUserID(event.currentTarget.value)
    }

    const onNameChange = (event) => {
        setName(event.currentTarget.value)
    }
    const onEmailChange = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onRegisteredCourseChange = (event) => {
        setRegisteredCourse(event.currentTarget.value)
    }
    const onContactNumberChange = (event) => {
        setContactNumber(event.currentTarget.value)
    }
    const onGenderChange = (event) => {
        setGender(event.currentTarget.value)
    }
    const onRoleChange = (event) => {
        setRole(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        // if (!studentID || !studentName || !phoneNo || !registeredCourse || !paymentAmount || !paymentAmount) {
        //     return alert('fill all the fields first!')
        // }

        const variables = {
            UserID: UserID,
            name: name,
            email: email,
            registeredCourse:registeredCourse,
            contactNumber: contactNumber,
            Gender:gender,
            Role : role,
        }


        Axios.put(`http://localhost:5001/api/users/updateUserInfo/${ID}`, variables)
            .then(response => {
                if (response.data) {
                    alert('User Details Successfully Edited')
                    props.history.push('/AllUsers')
                } else {
                    alert('User Details Successfully Edited')
                }
            })

    }

    return(
        <div style={{ width: '98%', margin: '6rem auto' }}>
            <div >
                <h1 style={{ textAlign: 'left' }}>  Update User Details </h1>
            </div>
            <hr/>

            <div style={{border: 'solid', width:'50%',  margin: '4rem auto'}}>
                <Form style={{ width: '50%', margin: '4rem auto'}} onSubmit={onSubmit} >

                    <label>*User ID :</label>
                    <Input
                        onChange={onUserIDChange}
                        value={UserID}
                    />
                    <br />
                    <br />

                    <label>*User Name :</label>
                    <Input
                        onChange={onNameChange}
                        value={name}
                    />
                    <br />
                    <br />

                    <label>*Email :</label>
                    <Input
                        onChange={onEmailChange}
                        value={email}
                    />
                    <br />
                    <br />

                    <label>*Registered Course :</label>
                    <Input
                        onChange={onRegisteredCourseChange}
                        value={registeredCourse}
                    />
                    <br />
                    <br />

                    <label>*Contact Number  :</label>
                    <Input
                        onChange={onContactNumberChange}
                        value={contactNumber}
                    />
                    <br />
                    <br />

                    <label>*Gender  :</label>
                    <Input
                        onChange={onGenderChange}
                        value={gender}
                    />
                    <br />
                    <br />

                    <label>*Role  :</label>
                    <Input
                        onChange={onRoleChange}
                        value={role}
                    />
                    <br />
                    <br />


                    <Button style={{marginLeft: '300px'}} onClick={onSubmit}>
                        Submit
                    </Button>

                </Form>

            </div>

        </div>
    )
}

export default UpdatePayments;