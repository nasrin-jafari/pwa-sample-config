import React, { useEffect, useState } from 'react';
import {Alert, Table} from "react-bootstrap";
import {json} from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);
    const [mode, setMode] = useState("online");
    const [error, setError] = useState(null);

    useEffect(() => {
        let url = "https://jsonplaceholder.typicode.com/users";

        fetch(url)
            .then((res) => {
                res.json().then(users => {
                    console.warn(users);
                    setUsers(users);
                    localStorage.setItem("users", JSON.stringify(users));
                })
            }).catch((err) => {
                // console.error('Fetch error:', err);
                // alert("in catch block")
            setMode("offline");
                setError('Failed to fetch users');
                let collection  = localStorage.getItem("users");
                setUsers(JSON.parse(collection))
            });
    }, []);

    return (
        <div>
            <div>
                {
                    mode === "offline" ? (
                        <Alert key={"warning"} variant={"warning"}>
                            you are in offline mode or some issue with connection
                        </Alert>

                    ) : null
                }
            </div>

            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th> Name</th>
                    <th>EMAIL</th>
                    <th>ADDRESS</th>
                </tr>
                </thead>
                <tbody>
                {
                    users?.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address.street}</td>
                        </tr>

                    ))
                }
                </tbody>
            </Table>
        </div>
    );
}

export default Users;
