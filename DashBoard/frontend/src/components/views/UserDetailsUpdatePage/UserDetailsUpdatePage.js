import React, { useState,useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from "react-redux";
import axios from "axios";
import Axios from "axios";

const { Title } = Typography;

function UserDetailsUpdatePage(props) {
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');

    const [User, setUser] = useState({})


    useEffect(() => {
        Axios.get(`/api/users/user_by_id?id=${userId}&type=single`)
            .then(response => {
                setUser(response.data[0])
            })
    }, [])

    const [formErrorMessage, setFormErrorMessage] = useState('')

    return (
        <Formik
            initialValues={{
                name: User.name,
                email: '',
                contactNumber: '',
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required('Name is required'),
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                contactNumber: Yup.string()
                    .required('Number is required'),

            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let dataToSubmit = {
                        name:values.name,
                        email: values.email,
                        contactNumber: values.contactNumber
                    };
                    console.log(dataToSubmit);
                    axios.put(`/api/users/updateUserInfo/${userId}`, dataToSubmit)
                        .then(res =>
                        {
                            localStorage.setItem("name",values.name);
                            if( res){
                                props.history.push("/user");
                                alert('success');
                            }else{
                                alert("Error while registering user");
                            }
                        }).
                    catch(err => {
                        console.log(err);
                    });
                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;
                return (
                    <div className="app" style={{ width: '75%', margin: '-4rem auto' }}>
                        <Title level={2}>Update User Info</Title>
                        <form onSubmit={handleSubmit} style={{ width: '350px' }}>

                            <Form.Item required label="Name">
                                <Input
                                    id="name"
                                    placeholder={User.name}
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.name && touched.name ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.name && touched.name && (
                                    <div className="input-feedback">{errors.name}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Email">
                                <Input
                                    id="email"
                                    placeholder={User.email}
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Contact Number">
                                <Input
                                    id="contactNumber"
                                    placeholder={User.contactNumber}
                                    type="text"
                                    value={values.contactNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.contactNumber && touched.contactNumber ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.contactNumber && touched.contactNumber && (
                                    <div className="input-feedback">{errors.contactNumber}</div>
                                )}
                            </Form.Item>

                            {formErrorMessage && (
                                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                            )}

                            <Form.Item>
                                <div>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                        Update Info
                                    </Button>
                                </div>
                            </Form.Item>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default withRouter(UserDetailsUpdatePage);


