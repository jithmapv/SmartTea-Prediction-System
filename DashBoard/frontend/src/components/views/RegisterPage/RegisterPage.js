import React, {useState} from "react";
import {Radio } from "antd";
import StudentReg from "./Sections/StudentRegPage";
import LecturerReg from "./Sections/LecturerRegPage"

function RegisterPage(props) {

    const [regType,setRegType] = useState(0);

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setRegType(e.target.value);
    };

    return (
        // style={{  margin: '3rem auto' }}
        <div className="app" style={{  margin: '6rem auto' }}>
            <h2>Sign Up</h2>
            <Radio.Group
                /*options={options}*/
                onChange={onChange}
                // value={regType}
                optionType="button"
                defaultValue="0"
                buttonStyle="solid"
            >
                <Radio.Button value="0">Student</Radio.Button>
                <Radio.Button value="1">
                    Lecturer
                </Radio.Button>
            </Radio.Group>

            { regType=="0"  ?
                <><br/>
                    <StudentReg/>
                </>

                : null }
            { regType=="1"  ?
                <><br/>
                    <LecturerReg/>
                </>

                : null }

        </div>
    );
};

export default RegisterPage
