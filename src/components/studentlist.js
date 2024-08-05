/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Dropdown, Table, Button, Spinner, Modal } from 'react-bootstrap';
import './Studentlist.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from './popup';
import toast from 'react-hot-toast';

const Studentlist = ({ setApiKey }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getStudentslist();
  }, []);

  const getStudentslist = () => {
    setLoading(true);
    // let auth = localStorage.getItem('token');
    // auth = auth.replace('DOOflA8u140fyPfUkb59jl330uORpxfJOKErB8p1X1Y', '');
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
      console.log('error while fetching the student list:', error.response.data.msg);
      setLoading(false);
      toast.error(error.response.data.msg);

    });
  };

  const Logout = () => {
    console.log('logout');
    localStorage.removeItem('token');
    setApiKey('');
    navigate('/');
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowPopup(true);
  };

  const handleSave = (student) => {
    if (editingStudent) {
      console.log('editing student:', student);
      student.id = editingStudent._id;
      axios.post('http://localhost:4001/api/student/student_create', student, {
        headers: {
          'authorization': localStorage.getItem('token'),
        },
      }).then((response) => {
        if (response.status === 200) {
          toast.success('Student updated successfully');
          getStudentslist();
          setShowPopup(false);
          setEditingStudent(null);
        }
      }).catch((error) => {
        console.log('error while updating the student:', error);
        toast.error('Error while updating the student');
      });
    } else {
      console.log('adding student:', student);
      axios.post('http://localhost:4001/api/student/student_create', student, {
        headers: {
          'authorization': localStorage.getItem('token'),
        },
      }).then((response) => {
        if (response.status === 200) {
          toast.success('Student added successfully');
          getStudentslist();
          setShowPopup(false);
        }
      }).catch((error) => {
        console.log('error while adding the student:', error);
        toast.error('Error while adding the student');
      });
    }
  };
  const handleDelete = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('student to delete:', studentToDelete);
    axios.delete(`http://localhost:4001/api/student/student_delete/${studentToDelete._id}`, {
      headers: {
        'authorization': localStorage.getItem('token'),
      },
    }).then((response) => {
      if (response.status === 200) {
        toast.success('Student deleted successfully');
        getStudentslist();
        setShowDeleteModal(false);
        setStudentToDelete(null);
      }
    }).catch((error) => {
      console.log('error while deleting the student:', error);
      toast.error('Error while deleting the student');
    });
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
                      <Dropdown.Item href="#" onClick={() => handleEdit(student)}>Edit</Dropdown.Item>
                      <Dropdown.Item href="#" onClick={() => handleDelete(student)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Button variant="dark" onClick={() => setShowPopup(true)}>Add</Button>
      <Popup
        show={showPopup}
        handleClose={() => {
          setShowPopup(false);
          setEditingStudent(null);
        }}
        handleSave={handleSave}
        student={editingStudent}
      />
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this student?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Studentlist;
