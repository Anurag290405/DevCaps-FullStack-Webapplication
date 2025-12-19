import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import GetEmails from "../API's/NewsAPI/GetEmails";
import WebsiteLoader from "../Loader/WebsiteLoader";
import * as XLSX from "xlsx";

export function NewsletterManager() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllemails = async () => {
    setLoading(true);
    const res = await GetEmails();
    if (res?.success) {
      setEmails(res?.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllemails();
  }, []);

  const handleExportSubscribers = (data, filename) => {
    if (!Array.isArray(data) || data.length === 0) {
      alert("No subscribers to export");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(data.map((sub) => ({ email: sub.email })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Subscribers");
    XLSX.writeFile(wb, filename);
    alert("Exported successfully!");
  };

  return (
    <div>
      {loading && <WebsiteLoader />}

      <div className="space-y-1 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Newsletter Subscribers</h1>
        <p className="text-gray-600">View and manage all newsletter subscribers</p>
      </div>

      {/* Stats */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Subscribers</p>
            <p className="text-4xl font-bold text-gray-800">{emails.length}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleExportSubscribers(emails, "subscribers.xlsx")}
              className="flex items-center gap-2 px-4 py-2 bg-[#267E5A] text-white rounded-lg hover:bg-[#1F6449] transition text-sm"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Subscribed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {emails && emails.length > 0 ? (
                emails.map((subscriber, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800">{subscriber.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {subscriber.createdAt
                        ? new Date(subscriber.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-8 text-center text-gray-500">
                    No subscribers yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default NewsletterManager;