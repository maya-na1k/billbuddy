import { useState } from 'react';
import { generateDisputeLetter } from '../../services/disputeGenerator';
import { FileText, Download, Loader2, Copy, CheckCircle } from 'lucide-react';

export default function DisputeLetterGenerator({ billId }) {
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateLetter = async () => {
    setLoading(true);
    try {
      const result = await generateDisputeLetter(billId);
      setLetter(result.letter);
    } catch (error) {
      alert('Error generating letter: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dispute Letter Generator</h2>
        <p className="text-gray-600">Generate a professional dispute letter automatically</p>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateLetter}
        disabled={loading}
        className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-4 rounded-2xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all transform hover:scale-[1.02] group mb-8 w-full"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
        )}
        <span>Generate Dispute Letter</span>
      </button>

      {/* Letter Display */}
      {letter ? (
        <div>
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => handleDownload(letter, 'dispute-letter.txt')}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-4 py-2.5 rounded-xl hover:shadow-md border border-purple-100 font-medium transition-all transform hover:scale-[1.02]"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={() => handleCopy(letter)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-4 py-2.5 rounded-xl hover:shadow-md border border-purple-100 font-medium transition-all transform hover:scale-[1.02]"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy to Clipboard
                </>
              )}
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 whitespace-pre-wrap text-sm max-h-96 overflow-y-auto custom-scrollbar">
            <div className="font-mono text-gray-800 leading-relaxed">{letter}</div>
          </div>
        </div>
      ) : (
        !loading && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No dispute letter generated yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Click the button above to generate a professional dispute letter based on your bill analysis.
            </p>
          </div>
        )
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #ec4899);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
      `}</style>
    </div>
  );
}
