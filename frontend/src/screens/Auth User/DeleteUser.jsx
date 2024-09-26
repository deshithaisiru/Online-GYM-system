import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardFooter } from '../../components/card';
import { Button } from '../../components/button';

const DeleteUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`/api/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust this based on how you store your auth token
        }
      });
      
      if (response.data.message === 'User removed') {
        navigate('/admin-dashboard'); // Updated to match your likely users list route
      } else {
        setError('Unexpected response from server');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error.response?.data?.message || 'Failed to delete user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-gray-800">Delete User</h1>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">Are you sure you want to delete this user? This action cannot be undone.</p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </CardContent>
        <CardFooter>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <Button 
                onClick={handleDelete} 
                className="bg-red-600 hover:bg-red-700 text-white mr-4"
              >
                Confirm Delete
              </Button>
              <Button 
                onClick={() => navigate('/admin-dashboard')} // Updated to match your likely users list route
                className="bg-gray-300 hover:bg-gray-400 text-gray-700"
              >
                Cancel
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteUser;