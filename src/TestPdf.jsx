import React from 'react';

const TestPdf = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">PDF Test Page</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Direct Links</h2>
          <div className="space-y-2">
            <p>Technical Resume: <a href="/resume-tech.pdf" className="text-blue-400 hover:underline">Open in browser</a></p>
            <p>PM Resume: <a href="/resume-pm.pdf" className="text-blue-400 hover:underline">Open in browser</a></p>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Download Links</h2>
          <div className="space-y-2">
            <p>
              <a 
                href="/resume-tech.pdf" 
                download="Dhruv_Ladani_Tech_Resume.pdf"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Download Tech Resume
              </a>
            </p>
            <p>
              <a 
                href="/resume-pm.pdf" 
                download="Dhruv_Ladani_PM_Resume.pdf"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Download PM Resume
              </a>
            </p>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Embedded PDFs</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Technical Resume:</h3>
              <iframe 
                src="/resume-tech.pdf" 
                className="w-full h-[500px] border border-gray-700 rounded"
                title="Technical Resume"
              />
            </div>
            <div>
              <h3 className="font-medium mb-2">PM Resume:</h3>
              <iframe 
                src="/resume-pm.pdf" 
                className="w-full h-[500px] border border-gray-700 rounded"
                title="PM Resume"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPdf;
