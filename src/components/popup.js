/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import './popup.css';

const Popup = ({ show, handleClose, handleSave, student }) => {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [marks, setMarks] = useState('');

    useEffect(() => {
        if (student) {
            console.log('student:', student);
            setName(student.name);
            setSubject(student.subject);
            setMarks(student.marks);
        } else {
            console.log('no student');
            setName('');
            setSubject('');
            setMarks('');
        }
    }, [student]);

    const onSave = () => {
        handleSave({ name, subject, marks });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{student ? 'Edit Student' : 'Add Student'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </div>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formSubject">
                        <Form.Label>Subject</Form.Label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faBook} />
                                </span>
                            </div>
                            <Form.Control
                                type="text"
                                placeholder="Enter subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formMarks">
                        <Form.Label>Marks</Form.Label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faGraduationCap} />
                                </span>
                            </div>
                            <Form.Control
                                type="number"
                                placeholder="Enter marks"
                                value={marks}
                                onChange={(e) => setMarks(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSave}>
                    {student ? 'Update' : 'Add'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Popup;
