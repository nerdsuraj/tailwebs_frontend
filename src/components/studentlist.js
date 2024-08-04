/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Dropdown, Table, Button ,Spinner} from 'react-bootstrap';
import './Studentlist.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Studentlist = ({ setApiKey }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getStudentslist();
    }, []);

    const getStudentslist = () => {
        setLoading(true);
        axios.get('http://localhost:4001/api/student/student_list', {
            headers: {
                'authorization': localStorage.getItem('token'),
            },
        }).then((response) => {
            console.log('response:', response);
            if (response.status === 200) {
                setStudents(response.data.data);
                setLoading(false);

            } else {
                console.log('error while fetching the student list:', response.data.message);
            }
        }).catch((error) => {
            console.log('error while fetching the student list:', error);
            setLoading(false);

        });
    };

    const Logout = () => {
        console.log('logout');
        localStorage.removeItem('token');
        setApiKey('');
        navigate('/');
    };

    return (
        <div className="container mt-5">
          <div className="d-flex justify-content-between mb-4">
            <h1 className="text-danger">tailwebs.</h1>
            <div>
              <Button variant="link" onClick={() => navigate('/')} title='home'>Home</Button>
              <Button onClick={Logout} variant="link" title='logout'>Logout</Button>
            </div>
          </div>
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Mark</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar">
                          <span className="avatar-text">{student.name.charAt(0)}</span>
                        </div>
                        <span className="ml-3">{student.name}</span>
                      </div>
                    </td>
                    <td>{student.subject}</td>
                    <td>{student.marks}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-basic">
                          &#x25BC;
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#">Edit</Dropdown.Item>
                          <Dropdown.Item href="#">Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Button variant="dark">Add</Button>
        </div>
      );
}

export default Studentlist;
