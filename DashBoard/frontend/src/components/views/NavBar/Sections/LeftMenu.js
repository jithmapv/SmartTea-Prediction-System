import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import '../Sections/Navbar.css';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';

const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {

    const [moduleNames, setModuleNames] = useState([]);
    const course = localStorage.getItem('registeredCourse');

    useEffect(() => {
        const getDetailsList = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/module/getOneCourse/${course}`)
                setModuleNames(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getDetailsList()
    }, []);

    const user = useSelector(state => state.user)

    return (
        //for Lecturer
        <Menu mode={props.mode}>
            <Menu.Item className="leftbtn" key="mail">
                <a href="/">Home</a>
            </Menu.Item>


            {/* <SubMenu className="leftbtn" key="exam" title="Examinations">
                    <Menu.Item key="results">
                        <a href="/allResult">Exam Results</a>
                    </Menu.Item>
                    <Menu.Item key="viewExam">
                        <a href="/all">Exam Timetable</a>
                    </Menu.Item>
                </SubMenu> */}

            <Menu.Item className="leftbtn" key="addSales">
                <a href="/addSales">Sales Prediction</a>
            </Menu.Item>

            <Menu.Item className="leftbtn" key="addTrend">
                <a href="/addTrend">Trend Prediction</a>
            </Menu.Item>

            <SubMenu className="leftbtn" key="churn" title="Churn Prediction">
                    <Menu.Item key="add">
                        <a href="/addChurn">Add Churn</a>
                    </Menu.Item>
                    <Menu.Item key="upload">
                        <a href="/uploadChurn">Upload Churn</a>
                    </Menu.Item>
                </SubMenu>


        </Menu>
    )
}


export default withRouter(LeftMenu);
