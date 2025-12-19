import { useEffect, useState } from "react";
import GetQuery from "../API's/ContactAPI/GetQuery";
import WebsiteLoader from "../Loader/WebsiteLoader";

export default function ContactQueries() {
    const [contactformdetails,setContactformdetails]=useState([])
    const [loading,setLoading]=useState(false)
    async function getcontactformdetails(){
        setLoading(true)
        const res=await GetQuery()
        if(res?.data){
            setContactformdetails(res.data)
        }
        setLoading(false)
    }
    useEffect(() => {
        getcontactformdetails()
    },[])
    return (
        <div>
            {
                loading && <WebsiteLoader/>
            }
            {/* Page Title */}
            <div className="space-y-1 mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Contact Submissions</h1>
                <p className="text-gray-600">
                    View and manage all contact form submissions
                </p>
            </div>

            {/* Table Container */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    {/* Table Head */}
                    <thead className="bg-gray-50 border-b border-gray-300">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Phone
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Message
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Submitted
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-gray-200">
                        {contactformdetails?.length > 0 ? (
                          contactformdetails.map((item, i) => (
                                <tr
                                    key={i}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.phone}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.message || "N/A"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                    No contact submissions yet
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
