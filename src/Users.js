import React, { useEffect, useState } from 'react';
import {Table} from "react-bootstrap";

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let url = "https://jsonplaceholder.typicode.com/users";

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                console.warn(data);
                setUsers(data);
            })
            .catch((err) => {
                console.error('Fetch error:', err);
                setError('Failed to fetch users');
            });
    }, []);

    return (
        <div>
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
