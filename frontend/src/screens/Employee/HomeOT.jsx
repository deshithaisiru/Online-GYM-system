import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './components/Spinner';
import { Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import { format } from 'date-fns'; // For date formatting
import BackButton from './components/BackButton';
import OTChart from './components/OTChart'; // Import the OTChart component
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Home5 = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [ot, setOT] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [report, setReport] = useState([]);

    useEffect(() => {
        fetchOTRecords();
    }, []);

    const fetchOTRecords = () => {
        setLoading(true);
        axios
            .get('http://localhost:5555/ot')
            .then((response) => {
                setOT(response.data.data);
                setLoading(false);
                setNoResults(false);
                generateReport(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const onClearSearch = () => {
        setSearchQuery("");
        fetchOTRecords();
    };

    const handleSearch = () => {
        if (!searchQuery) {
            fetchOTRecords();
            return;
        }

        const isDate = !isNaN(Date.parse(searchQuery));

        setLoading(true);
        axios
            .get(`http://localhost:5555/ot/search-ot`, {
                params: {
                    query: searchQuery,
                    isDate,
                },
            })
            .then((response) => {
                if (response.data.ot.length === 0) {
                    setNoResults(true);
                } else {
                    setOT(response.data.ot);
                    setNoResults(false);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const generateReport = (otData) => {
        const reportData = {};

        otData.forEach(record => {
            const month = format(new Date(record.otDate), 'MMMM');
            const employee = record.name;

            if (!reportData[employee]) {
                reportData[employee] = {};
            }

            if (!reportData[employee][month]) {
                reportData[employee][month] = 0;
            }

            reportData[employee][month] += record.otHrs;
        });

        setReport(reportData);
    };

    // Function to download report as PDF
    const downloadPDF = () => {
        const pdf = new jsPDF('portrait', 'pt', 'a4');
        const table = document.getElementById('report-table');

        html2canvas(table, { scale: 2 }) // Increase scale for better quality
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = pdf.internal.pageSize.getWidth(); // Use the full width of the page
                const pageHeight = pdf.internal.pageSize.getHeight();
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;

                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight); // Align to the left
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight); // Align to the left
                    heightLeft -= pageHeight;
                }

                pdf.save('ot_report.pdf');
            });
    };

    return (
        <div className="p-4 bg-gradient-to-r from-white to-yellow-500 min-h-screen">
            <BackButton />
            
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8 text-black'>Employee OT</h1>

                <SearchBar 
                    value={searchQuery}
                    onChange={({ target }) => setSearchQuery(target.value)}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />

                <Link to='/ot/create'>
                    <button className="bg-gray-900 text-white font-bold px-6 py-3 rounded-lg text-xl hover:bg-yellow-700 hover:text-black transition-colors duration-500 transform hover:scale-105 border border-black-800 rounded-md p-2">
                        Add OT
                    </button>
                </Link>
            </div>

            {loading ? (
                <Spinner />
            ) : noResults ? (
                <div className='text-center text-red-500'>
                    No OT records found matching the search criteria.
                </div>
            ) : (
                <>
                    <table className="w-full border-separate border-spacing-2 bg-white bg-opacity-70 rounded-xl shadow-lg text-black">
                        <thead>
                            <tr className="bg-yellow-600">
                                <th className="border border-slate-600 rounded-md">No</th>
                                <th className="border border-slate-600 rounded-md">ID</th>
                                <th className="border border-slate-600 rounded-md">Name</th>
                                <th className="border border-slate-600 rounded-md">OT Date</th>
                                <th className="border border-slate-600 rounded-md">OT Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ot.length > 0 && ot.map((ot, index) => (
                                <tr key={ot._id} className='h-8'>
                                    <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>  
                                    <td className='border border-slate-700 rounded-md text-center'>{ot.iD}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{ot.name}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{format(new Date(ot.otDate), 'yyyy-MM-dd')}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{ot.otHrs}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <OTChart otData={ot} />
                </>
            )}

            {/* Report Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-black mb-4">OT Report by Employee and Month</h2>
                <button 
                    onClick={downloadPDF}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-yellow-700 transition duration-300"
                >
                    Download PDF
                </button>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    {Object.keys(report).length === 0 ? (
                        <p>No report data available</p>
                    ) : (
                        <table id="report-table" className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Employee</th>
                                    <th className="border px-4 py-2">Month</th>
                                    <th className="border px-4 py-2">Total OT Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(report).map((employee) => (
                                    Object.keys(report[employee]).map((month) => (
                                        <tr key={`${employee}-${month}`}>
                                            <td className="border px-4 py-2">{employee}</td>
                                            <td className="border px-4 py-2">{month}</td>
                                            <td className="border px-4 py-2">{report[employee][month]}</td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home5;   
