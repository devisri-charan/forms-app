import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

function PostSubmissionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, formTitle } = location.state;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(formTitle, 10, 10);

    Object.entries(formData).forEach(([key, value], index) => {
      doc.setFontSize(12);
      doc.text(`${key}: ${value}`, 10, 20 + index * 10);
    });

    doc.save(`${formTitle}.pdf`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 flex flex-col justify-center items-center p-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Thank You for Your Submission!</h1>
        <p className="text-lg text-gray-600 mb-8">Your submission has been received successfully. You can download the details as a PDF or return to the dashboard.</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-xl hover:bg-green-600 transition duration-300 shadow-md"
          >
            Download PDF
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-gray-500 text-white text-lg font-semibold rounded-xl hover:bg-gray-600 transition duration-300 shadow-md"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostSubmissionPage;
