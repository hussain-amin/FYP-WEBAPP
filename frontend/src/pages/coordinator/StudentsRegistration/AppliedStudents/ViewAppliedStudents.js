import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import AddStudentsFile from '../../../../components/AddStudentsFile/AddStudentsFile';
import axios from 'axios';

function ViewAppliedStudents() {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/viewAppliedStudentList');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await response.json();
            console.log("Fetched data:", responseData.data);
            if (Array.isArray(responseData.data)) {
                setStudentData(responseData.data);
            } else {
                console.error('Data is not an array:', responseData.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleVerify = async () => {
        try {
            const response = await fetch('http://localhost:3001/verifyAppliedStudentList');
            if (!response.ok) {
                throw new Error('Failed to verify students');
            }
            console.log("ResponseData = ", response)
            const responseData = await response.json();
    
            const eligibleStudents = responseData.data
                .filter(student => student.isEligible)
                .map(student => ({
                    userid: student['Roll No.'],
                    name: student.Name,
                    email: student.Email,
                    program: student.Program,
                    Status: 'Active',
                    Credited: 'Y'
                }));
    
            console.log('Eligible students:', eligibleStudents);
    
            const registerResponse = await axios.post('http://localhost:3001/registerEligibleStudents',
                { data: eligibleStudents });
    
            console.log('Register response:', eligibleStudents);
    
            if (registerResponse.status !== 201) {
                throw new Error('Failed to register students');
            }
    
            console.log('Navigation to next page...');
            navigate('/coordinator/ActualEnrolledStudents', { state: { eligibleStudents } });
        } catch (error) {
            console.error('Error verifying and registering:', error);
        }
    };

    return (
        <div className='container'>
            <div className="shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row">
                    <div className="mb-4 mt-2 text-gred text-center">
                        <h2><b>Applied Students</b></h2>
                    </div>
                </div>
                <AddStudentsFile fetchData={fetchData} />
                <div className="row" style={{ marginLeft: '10px' }}>
                    <div className="table-responsive">
                        <Table className='table table-striped table-hover text-center table-sm' style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Roll No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Enrollment Date</th>
                                    <th>Status</th>
                                    <th>Credited</th>
                                    <th>Entry Date</th>
                                    <th>Program</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '13px' }}>
                                {studentData.map((student, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{student['Roll No.']}</td>
                                        <td>{student.Name}</td>
                                        <td>{student.Email}</td>
                                        <td>{student['Enrollment Date']}</td>
                                        <td>{student.Status}</td>
                                        <td>{student.Credited}</td>
                                        <td>{student['Entry Date']}</td>
                                        <td>{student.Program}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <button type="button" className="btn" style={{ backgroundColor: '#0496FF', color: 'white' }} onClick={handleVerify}>Verify</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewAppliedStudents;
