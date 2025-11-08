import { useState } from 'react';
import FileUploader from '../components/upload/FileUploader';

export default function Dashboard({ user, onLogout }) {
  const [showUploader, setShowUploader] = useState(false);

  const handleUploadComplete = (billData) => {
    console.log('Bill uploaded:', billData);
    setShowUploader(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">BillBuddy</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user.email}</span>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {!showUploader ? (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Your Medical Bills</h2>
            <p className="text-gray-600 mb-8">
              Upload your first medical bill to get started with AI-powered analysis
            </p>
            <button
              onClick={() => setShowUploader(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium text-lg"
            >
              Upload Medical Bill
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setShowUploader(false)}
              className="mb-4 text-blue-600 hover:text-blue-700"
            >
              ← Back to Dashboard
            </button>
            <FileUploader onUploadComplete={handleUploadComplete} />
          </div>
        )}
      </div>
    </div>
  );
}