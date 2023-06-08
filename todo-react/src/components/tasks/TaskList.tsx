import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";



const TaskList = () => {
    const [Tasks, setTasks] = useState<any[]>([])
    const [form, setForm] = useState<any>({});

    const fetchTaskList = () => {
        fetch('http://localhost:5000/api/task')
            .then(response => response.json())
            .then(res => setTasks(res))
    }

    useEffect(() => {
        fetchTaskList()
    }, []);

    const deleteTask = (id: string) => {
        if (window.confirm("Delete the Task?")) {
            fetch(`http://localhost:5000/api/task/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(res => fetchTaskList());
        }
    }

    const toggleStatus = (id: string, status: boolean) => {
        fetch(`http://localhost:5000/api/task/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'status': status })
        })
            .then(response => response.json())
            .then(res => fetchTaskList());
    }
    const completeTask = (id: string) => {
        toggleStatus(id, false);
    }

    const openTask = (id: string) => {
        toggleStatus(id, true);
    }



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!form.task_name) {
            return false;
        }
        const Tasks = {
            "name": form.task_name,
            "status": false
        }
        fetch('http://localhost:5000/api/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Tasks)
        })
            .then(response => response.json())
            .then(res => fetchTaskList());
        //   .then(res => console.log(res));
        // console.log(Tasks)
        // const name = event.target.name.value;
        console.log(form.task_name);


    }
    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Tasks</Card.Title>
                </Card.Header>
                <Card.Body key="-1">
                    <div className="p-2 text-capitalize ">
                        <Form onSubmit={submitHandler}>
                            <span className="float-start">
                                <Form.Group >
                                    <Form.Control type="text" placeholder="Add Task" id="task_name" name="task_name" onChange={handleChange} />
                                </Form.Group>
                            </span>
                            <span className="float-end">
                                <Button variant="success outline-secondary" type="submit">Add Task</Button>
                            </span>
                        </Form>
                    </div>
                </Card.Body>

                {Tasks.map((task, index) => (
                    <Card.Body key={index} >
                        <Card bg="success" key={task._id}>
                            <div className="p-2 text-capitalize ">
                                <Row>
                                    <Col>
                                        <span className={`float-start ${(task.status) ? '' : ' text-decoration-line-through'}`}>
                                            <b>{index + 1}</b>  {task.name + ' ' + task.status}
                                        </span>
                                    </Col>
                                    <Col>

                                        <span className="float-end">
                                            <Row>

                                                <Col>
                                                    {(task.status) && <Button variant="primary outline-secondary" size="sm" onClick={() => completeTask(task._id)}>Complete</Button>}
                                                    {(!task.status) && <Button variant="primary outline-secondary" size="sm" onClick={() => openTask(task._id)} >Re-Open</Button>}


                                                    {/* <Button variant="primary outline-secondary" size="sm" onClick={() => completeTask(task._id)} >Complete</Button> */}
                                                </Col>
                                                <Col>
                                                    <Button key={task._id} variant="danger outline-secondary" size="sm" onClick={() => deleteTask(task._id)} >Delete</Button>
                                                </Col>
                                            </Row>
                                        </span>
                                    </Col>
                                </Row>

                            </div>
                        </Card>
                    </Card.Body>
                ))}

            </Card>
        </>
    )
}

export default TaskList;