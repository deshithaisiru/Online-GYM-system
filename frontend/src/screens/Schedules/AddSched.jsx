import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Update() {
    const [formData, setFormData] = useState({ schedule: '' });
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();
    const { Sdd } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/schedule/updateSchedule/${Sdd}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ schedule: formData.schedule }),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

            alert("Success");
            navigate(""); // Redirect after successful update
        } catch (error) {
            setPublishError("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-yellow-800">
                        Add Schedule
                    </h2>
                    <p className="mt-2 text-center text-sm text-yellow-600">
                        <Link to="/schedulemanage" className="font-medium text-yellow-600 hover:text-yellow-500">
                            Back to Schedule Management
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="schedule" className="sr-only">Schedule</label>
                            <textarea
                                id="schedule"
                                name="schedule"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-yellow-300 placeholder-yellow-500 text-yellow-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your schedule here"
                                rows="4"
                                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            Submit Schedule
                        </button>
                    </div>
                </form>
                {publishError && (
                    <p className="mt-2 text-center text-sm text-red-600">
                        {publishError}
                    </p>
                )}
            </div>
        </div>
    );
}