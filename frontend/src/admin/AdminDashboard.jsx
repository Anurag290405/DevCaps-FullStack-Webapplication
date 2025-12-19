import { useEffect, useState } from 'react';
import { 
  Briefcase,
  Users,
  Mail,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { toast, Toaster } from "sonner";
import logo from '../assests/HomePage/Logo-WithoutBg.png';

import ProjectsManager from './ProjectsManager';
import ContactQueries from './ContactQueries';
import NewsletterManager from './NewsletterManager';
import SuccessStoriesManager from './SuccessStoriesManager';
import Verify from '../API\'s/AdminAPI/Verify';
import Logout from '../API\'s/AdminAPI/Logout';

const navigationItems = [
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'contact', label: 'Contact Submissions', icon: Mail },
  { id: 'newsletter', label: 'Newsletter Subscribers', icon: Mail },
  { id: 'success-stories', label: 'Success Stories', icon: Mail },
];

export function AdminDashboard() {
  const [userRole, setUserRole] = useState("Admin");
  const [activeSection, setActiveSection] = useState('projects');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const res = await Verify();
      if (res?.success || res?.message === "Admin verified successfully") {
        setUserRole(res?.name || "Admin");
      }
    };
    verifyAdmin();
  }, []);

  const logoutUser = async () => {
    try {
      await Logout();
      window.location.href = "/admin";
    } catch (error) {
      console.error("Logout failed:", error);
      window.location.href = "/admin";
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'projects':
        return <ProjectsManager />;
      case 'clients':
        return <ProjectsManager />; // Clients list not implemented
      case 'contact':
        return <ContactQueries />;
      case 'newsletter':
        return <NewsletterManager />;
      case 'success-stories':
        return <SuccessStoriesManager />;
      default:
        return <ProjectsManager />;
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 overflow-y-auto`}>
        <Toaster richColors position="top-right" />

        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="DevCaps" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="font-bold text-gray-800">DevCaps</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
          <button
            className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-[#267E5A] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className="p-4 space-y-3 border-t border-gray-200">
          <button
            onClick={logoutUser}
            className="w-full flex cursor-pointer items-center justify-start px-3 py-2 bg-[#267E5A] text-white rounded-md hover:bg-[#1F6449] transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </button>
              <h2 className="capitalize font-semibold text-gray-800">
                {navigationItems.find((item) => item.id === activeSection)?.label || 'Dashboard'}
              </h2>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {renderActiveSection()}
        </main>
        </div>
      </div>
    );
  }

  export default AdminDashboard;
