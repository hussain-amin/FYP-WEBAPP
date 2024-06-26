import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const ViewGroupDetails = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const navigate = useNavigate();
    const location = useLocation();
    const { groupid } = location.state;
    const [group, setGroup] = useState(null);
    const [coomonFreeSlots, setCommoncoomonFreeSlots] = useState([]);
    const [supervisor, setSupervisor] = useState(null);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/viewSingleGroupDetails/${groupid}`)
            .then(response => {
                const groupData = response.data;
                setGroup(groupData.group);
                setCommoncoomonFreeSlots(groupData.group.commoncoomonFreeSlots);
                setSupervisor(groupData.supervisor);
                setMembers(groupData.members);
            })
            .catch(error => {
                console.error(error);
            });
    }, [groupid]);

    console.log(group)

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSupervisorProfile = (supervisor) => {
        navigate(`/coordinator/ViewGroupSupervisorProfile`, { state: { supervisor } });
    };

    const handleGroupMemberProfile = (member) => {
        navigate(`/coordinator/ViewGroupMemberProfile`, { state: { student: member } });
    };

    return (
        <div className='container'>
            <div className='shadow-lg p-3 col-md-12 mb-5 mt-5 bg-body rounded'>
                <div className="row">
                    <div className="col-sm-6 offset-sm-3 mb-4 mt-2 text-gred text-center">
                        <h2><b>Group Details</b></h2>
                    </div>
                    <div className="col-sm-3 mb-4 mt-3 text-end">
                        <button className="btn-close" onClick={handleGoBack} style={{ marginRight: '1rem' }} />
                    </div>
                </div>
                <div className='row'>
                {group && supervisor && members.length > 0 && (
                        <form style={{ paddingLeft: '50px' }}>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="groupid" className="col-form-label">Group ID</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control form-control-sm p-2" id="groupid" value={group.groupid} disabled />
                                </div>
                            </div>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="projectTitle" className="col-form-label">Project Title</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control form-control-sm p-2" id="projectTitle" value={group.title} disabled />
                                </div>
                            </div>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="groupDomain" className="col-form-label">Domain</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control form-control-sm p-2" id="groupDomain" value={group.domain} disabled />
                                </div>
                            </div>
                            <div className="form-group row pt-3">
                                <div className="col-md-2 pt-2">
                                    <label htmlFor="supervisor" className="col-form-label">Supervisor</label>
                                </div>
                                <div className="col-md-8 pt-3">
                                    <span className="btn-link" onClick={() => handleSupervisorProfile(group.supervisor)}
                                        style={{ color: '#0496FF', cursor: 'pointer', textDecoration: 'none' }}
                                        title="View Profile">
                                        {supervisor.userid}&nbsp;
                                        {supervisor.name}
                                    </span>
                                </div>
                            </div>

                            <div className="form-group row pt-3">
                                <div>
                                    <label htmlFor="members" className="col-form-label">Group Members</label>
                                </div>
                                <div className="col-sm-6 offset-md-2">
                                    {members.map((member, index) => (
                                        <div key={index}>
                                            <span className="btn-link" onClick={() => handleGroupMemberProfile(member)}
                                                style={{ color: '#0496FF', cursor: 'pointer', textDecoration: 'none' }}
                                                title="View Profile">
                                                {member.userid} &nbsp;
                                                ({member.program}) &nbsp;
                                                {member.name}
                                            </span>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div className='form-group row pt-3'>
                                <div className="col-sm-4">
                                    <label htmlFor='coomonFreeSlots'>Common Free Slots</label>
                                </div>
                                {/* <div className="table-responsive pt-3">
                                    <Table className='table table-striped table-hover text-center table-sm' style={{ width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                {days.map((day, index) => (
                                                    <th key={index}>{day}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[1, 2, 3, 4, 5, 6].map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <td>{row}</td>
                                                    {days.map((_, columnIndex) => {
                                                        const slot = coomonFreeSlots[rowIndex] ? coomonFreeSlots[rowIndex][columnIndex] : 0;
                                                        return (
                                                            <td key={columnIndex}>
                                                                <button
                                                                    className="btn btn-lg btn-custom"
                                                                    style={{ backgroundColor: slot ? '#0496FF' : 'transparent', borderColor: 'lightgray', height: '4vh', width: '4vw' }}
                                                                    disabled
                                                                >
                                                                </button>
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div> */}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewGroupDetails;