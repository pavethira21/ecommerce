import React, { useEffect, useState } from 'react';

export default function Profile(){
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
                console.log(token)
                if (!token) {
                    setError('User is not authenticated');
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://localhost:5000/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Send token in headers
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Conditional rendering based on loading and error state
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Profile</h2>
            <div style={{ marginBottom: '15px' }}>
                
            </div>
            <div>
                <strong>Name:</strong> {userData.userName}
            </div>
            <div>
                <strong>Email:</strong> {userData.email}
            </div>
            {/* <div>
                <strong>Phone:</strong> {userData.phone}
            </div> */}
            <div>
                <strong>Address:</strong> {userData.address}
            </div>
        </div>
    );
};


