import jsPDF from 'jspdf';
import "jspdf-autotable";

const GeneratePdf = users =>{

    const userDoc = new jsPDF();

    const tableColumn = ["User ID","Name","Email","Course (Registered/Assigned)","Contact Number"," Gender", "Role"];
    const tableRows = [];

    users.forEach(users => {
        const UserData = [
            users.UserID,
            users.name,
            users.email,
            users.registeredCourse,
            users.contactNumber,
            users.Gender,
            users.Role,
        ];

        console.log(UserData);

        tableRows.push(UserData);
    });

    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();


    userDoc.autoTable(tableColumn,tableRows,{startY:20});
    userDoc.text("List of Payments",14,15);
    userDoc.save(`Payment_Report_${year +" "+ month +" "+date}.pdf`);
};

export default GeneratePdf;