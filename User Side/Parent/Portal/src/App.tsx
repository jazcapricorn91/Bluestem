import React, { useState } from 'react';
import { Calendar, Bell, MessageSquare, Users, BookOpen, DollarSign, Clock, Camera, FileText, Settings, Home, ChevronRight, User, AlertTriangle, Send, Phone, Mail, MapPin, Download, Eye, Edit3 } from 'lucide-react';

const ParentPortalDemo = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeChild, setActiveChild] = useState('emma');
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data
  // Sidebar content as a variable to avoid duplication
  const sidebarContent = (
    <>
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Parent Portal</h2>
        <p className="text-sm text-gray-600">Johnson Family</p>
      </div>
      <nav className="p-4 space-y-2">
        <SidebarItem icon={Home} label="Dashboard" id="dashboard" />
        <SidebarItem 
          icon={User} 
          label="My Children" 
          id="children"
          children={[
            { id: 'emma', name: 'Emma', photo: '👧', hasUpdates: true },
            { id: 'noah', name: 'Noah', photo: '👦', hasUpdates: false }
          ]}
        />
        <SidebarItem icon={DollarSign} label="Tuition" id="tuition" />
        <SidebarItem icon={MessageSquare} label="Communication" id="communication" hasAlert={true} />
        <SidebarItem icon={Calendar} label="Calendar" id="calendar" />
        <SidebarItem icon={FileText} label="Forms & Documents" id="forms" hasAlert={true} />
        <SidebarItem icon={Clock} label="Volunteer Tracking" id="volunteer" />
        <SidebarItem icon={Users} label="PTO/School Community" id="pto" />
        <SidebarItem icon={BookOpen} label="Directory" id="directory" />
        <SidebarItem icon={Bell} label="News & Updates" id="news" />
        <SidebarItem icon={Settings} label="Settings" id="settings" />
      </nav>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Hamburger for mobile */}
      <button
        className="absolute top-4 left-4 z-30 md:hidden bg-white border rounded p-2 shadow"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {/* Sidebar: hidden on mobile, visible on md+ */}
      <div className="w-64 bg-white shadow-lg border-r hidden md:block">
        {sidebarContent}
      </div>

      {/* Sidebar drawer for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setSidebarOpen(false)}></div>
          {/* Drawer */}
          <div className="relative w-64 bg-white border-r h-full flex-shrink-0 flex flex-col z-50 animate-slideInLeft">
            <button
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
      preview: 'Here are some suggestions for supporting Noah\'s math learning...',
      date: '3 days ago',
      read: true
    }
  ];

  const calendarEvents = {
    '2024-10-25': [
      { time: '9:00 AM', event: 'Emma - Snack Day & Show and Tell', type: 'personal' },
      { time: '3:30 PM', event: 'Parent Volunteer Meeting', type: 'volunteer' }
    ],
    '2024-10-28': [
      { time: '6:00 PM', event: 'Fall Festival', type: 'school' }
    ],
    '2024-11-01': [
      { time: '9:00 AM', event: 'Picture Day', type: 'school' }
    ],
    '2024-11-05': [
      { time: '4:00 PM', event: 'Parent-Teacher Conference - Emma', type: 'meeting' },
      { time: '4:30 PM', event: 'Parent-Teacher Conference - Noah', type: 'meeting' }
    ]
  };

  const parentDirectory = [
    { name: 'Sarah Johnson', phone: '(555) 123-4567', email: 'sarah.johnson@email.com', address: '123 Maple St', children: 'Emma, Noah' },
    { name: 'Mike Chen', phone: '(555) 234-5678', email: 'mike.chen@email.com', address: '456 Oak Ave', children: 'Lily Chen' },
    { name: 'Amanda Williams', phone: '(555) 345-6789', email: 'amanda.w@email.com', address: '789 Pine Rd', children: 'Jacob Williams' },
    { name: 'David Rodriguez', phone: '(555) 456-7890', email: 'david.r@email.com', address: '321 Elm St', children: 'Sofia Rodriguez' }
  ];

  const adminDirectory = [
    { name: 'Ms. Rodriguez', role: 'Primary Teacher', contact: 'Contact' },
    { name: 'Mr. Thompson', role: 'Elementary Teacher', contact: 'Contact' },
    { name: 'Mrs. Davis', role: 'Director', contact: 'Contact' },
    { name: 'Ms. Parker', role: 'Assistant Teacher', contact: 'Contact' }
  ];

  const forms = [
    { name: 'Student Handbook', type: 'pdf', status: 'available' },
    { name: 'Vaccination Records', type: 'form', status: 'pending', dueDate: 'Nov 1, 2024' },
    { name: 'Title 20 Compliance', type: 'pdf', status: 'available' },
    { name: 'Enrollment Agreement', type: 'form', status: 'completed' },
    { name: 'Vaccine Records Update', type: 'form', status: 'pending', dueDate: 'Dec 15, 2024' },
    { name: 'Rule 13 (Homeschool)', type: 'pdf', status: 'available' },
    { name: 'DHHS Children\'s Record', type: 'form', status: 'completed' }
  ];

  type SidebarChild = { id: string; name: string; photo: string; hasUpdates: boolean };
  type SidebarItemProps = {
    icon: React.ElementType;
    label: string;
    id: string;
    hasAlert?: boolean;
    children?: SidebarChild[];
  };

  const SidebarItem = ({ icon: Icon, label, id, hasAlert = false, children = [] }: SidebarItemProps) => (
    <div className="mb-1">
      <div 
        className={`flex items-center px-4 py-2 cursor-pointer rounded-lg transition-colors ${
          activeSection === id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
        }`}
        onClick={() => setActiveSection(id)}
      >
        <Icon size={18} className="mr-3" />
        <span className="flex-1">{label}</span>
        {hasAlert && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
        {children && children.length > 0 && <ChevronRight size={14} />}
      </div>
      {children && children.length > 0 && activeSection === id && (
        <div className="ml-6 mt-1 space-y-1">
          {children.map((child) => (
            <div
              key={child.id}
              className={`flex items-center px-4 py-2 cursor-pointer rounded-lg text-sm transition-colors ${
                activeChild === child.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
              onClick={() => setActiveChild(child.id)}
            >
              <span className="mr-2">{child.photo}</span>
              <span>{child.name}</span>
              {child.hasUpdates && <div className="w-2 h-2 bg-green-500 rounded-full ml-auto"></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const Communication = () => (
    <div className="space-y-6">
      {/* Contact School Quick Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-blue-900">Need to contact the school?</h3>
            <p className="text-blue-700 text-sm">Send a message directly to the main office</p>
          </div>
          <button 
            onClick={() => setShowContactForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Contact School
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'inbox', label: 'Inbox' },
              { id: 'forum', label: 'Parent Forum' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'inbox' && (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    !message.read ? 'bg-blue-50 border-blue-200' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`font-medium ${!message.read ? 'text-blue-900' : 'text-gray-900'}`}>
                          {message.from}
                        </span>
                        {!message.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      </div>
                      <h4 className={`font-medium mb-1 ${!message.read ? 'text-blue-800' : 'text-gray-800'}`}>
                        {message.subject}
                      </h4>
                      <p className="text-gray-600 text-sm">{message.preview}</p>
                    </div>
                    <span className="text-gray-500 text-xs">{message.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'forum' && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">🎃 Halloween Costume Exchange</h4>
                <p className="text-gray-600 text-sm mb-2">Anyone have size 4T costumes they'd like to swap? My daughter outgrew hers!</p>
                <div className="text-xs text-gray-500">Posted by Maria S. • 2 hours ago • 3 replies</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">🚗 Carpool for Field Trip</h4>
                <p className="text-gray-600 text-sm mb-2">Looking to organize carpool for the farm field trip next week. Who's interested?</p>
                <div className="text-xs text-gray-500">Posted by David R. • 1 day ago • 5 replies</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">📚 Book Recommendations</h4>
                <p className="text-gray-600 text-sm mb-2">What are your kids' favorite books right now? Always looking for new ideas!</p>
                <div className="text-xs text-gray-500">Posted by Jennifer L. • 3 days ago • 8 replies</div>
              </div>

              <button className="w-full bg-green-600 text-white  py-3 rounded-lg hover:bg-green-700">
                + New Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Contact School Office</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter subject"
                  defaultValue={prefilledMessage ? "Volunteer Interest - Dinner Night" : ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  className="w-full border rounded-lg px-3 py-2 h-32"
                  placeholder="Type your message..."
                  defaultValue={prefilledMessage}
                />
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                  Send Message
                </button>
                <button 
                  onClick={() => {
                    setShowContactForm(false);
                    setPrefilledMessage('');
                  }}
                  className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const CalendarView = () => {
    const daysInMonth = 31;
    const firstDay = 2; // October 1st is a Tuesday (0=Sunday, 1=Monday, etc.)
    
    const getDayEvents = (day) => {
      const dateStr = `2024-10-${day.toString().padStart(2, '0')}`;
      return calendarEvents[dateStr] || [];
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold">October 2024</h3>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
              Sync to Google Calendar
            </button>
          </div>
          
          <div className="p-4">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
                  {day}
                </div>
              ))}
              
              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`empty-${i}`} className="p-2"></div>
              ))}
              
              {/* Days of the month */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const events = getDayEvents(day);
                const isToday = day === 24;
                
                return (
                  <div
                    key={day}
                    className={`p-2 min-h-20 border rounded cursor-pointer hover:bg-gray-50 ${
                      isToday ? 'bg-blue-100 border-blue-300' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isToday ? 'text-blue-700' : 'text-gray-900'
                    }`}>
                      {day}
                    </div>
                    {events.map((event, idx) => (
                      <div
                        key={idx}
                        className={`text-xs p-1 rounded mb-1 ${
                          event.type === 'personal' ? 'bg-yellow-100 text-yellow-800' :
                          event.type === 'school' ? 'bg-green-100 text-green-800' :
                          event.type === 'volunteer' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {event.event.length > 20 ? event.event.substring(0, 17) + '...' : event.event}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Event Details */}
        {selectedDate && getDayEvents(selectedDate).length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h4 className="font-semibold mb-3">Events for October {selectedDate}</h4>
            <div className="space-y-2">
              {getDayEvents(selectedDate).map((event, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">{event.time}</div>
                  <div className="flex-1 font-medium">{event.event}</div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    event.type === 'personal' ? 'bg-yellow-100 text-yellow-800' :
                    event.type === 'school' ? 'bg-green-100 text-green-800' :
                    event.type === 'volunteer' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {event.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const PTOSection = () => (
    <div className="space-y-6">
      {/* Latest Minutes */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Latest PTO Meeting Minutes</h3>
        </div>
        <div className="p-4">
          <h4 className="font-medium mb-2">October 2024 - Fall Planning Meeting</h4>
          <p className="text-gray-600 text-sm mb-3">Meeting called to order at 7:00 PM. Present: Sarah J., Mike C., Amanda W., David R., and Mrs. Davis (Director). 

          Topics discussed:
          • Fall Festival planning - October 28th
          • Fundraising update - $2,300 raised so far
          • Volunteer coordinator position - still need volunteers
          • Dinner night planning for November...</p>
          <button className="text-blue-600 text-sm hover:underline">Read Full Minutes →</button>
        </div>
      </div>

      {/* Volunteer Opportunities */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Current Volunteer Needs</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="border-l-4 border-red-400 pl-4 bg-red-50 p-3 rounded-r-lg">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium text-red-800">🍽️ Dinner Night Volunteers Needed</h5>
                <p className="text-red-700 text-sm">We need 5 more volunteers to help with setup and serving for our monthly family dinner night on November 15th.</p>
                <p className="text-red-600 text-xs mt-1">Urgent - Event in 3 weeks</p>
              </div>
              <button 
                onClick={() => {
                  setPrefilledMessage("I'm interested in volunteering for dinner night on November 15th. Please let me know what help is needed and what time commitment is involved.");
                  setShowContactForm(true);
                  setActiveSection('communication');
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
              >
                I'm Interested!
              </button>
            </div>
          </div>

          <div className="border-l-4 border-yellow-400 pl-4 bg-yellow-50 p-3 rounded-r-lg">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium text-yellow-800">📚 Reading Corner Setup</h5>
                <p className="text-yellow-700 text-sm">Help organize and refresh our parent reading corner in the main hallway.</p>
                <p className="text-yellow-600 text-xs mt-1">Flexible timing</p>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                Volunteer
              </button>
            </div>
          </div>

          <div className="border-l-4 border-green-400 pl-4 bg-green-50 p-3 rounded-r-lg">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium text-green-800">🎨 Art Supply Organization</h5>
                <p className="text-green-700 text-sm">Monthly organization of art supplies and materials in both classrooms.</p>
                <p className="text-green-600 text-xs mt-1">Monthly commitment</p>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Archives */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Meeting Archives</h3>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">September 2024 - Back to School Planning</span>
            <button className="text-blue-600 text-sm hover:underline">View</button>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">August 2024 - Summer Wrap-up</span>
            <button className="text-blue-600 text-sm hover:underline">View</button>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">May 2024 - End of Year Celebration</span>
            <button className="text-blue-600 text-sm hover:underline">View</button>
          </div>
        </div>
      </div>
    </div>
  );

  const Directory = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'parents', label: 'Parents & Families' },
              { id: 'admin', label: 'School Staff' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'parents' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 font-medium text-gray-700">Phone</th>
                    <th className="text-left py-3 font-medium text-gray-700">Email</th>
                    <th className="text-left py-3 font-medium text-gray-700">Address</th>
                    <th className="text-left py-3 font-medium text-gray-700">Children</th>
                  </tr>
                </thead>
                <tbody>
                  {parentDirectory.map((parent, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-3">{parent.name}</td>
                      <td className="py-3">
                        <a href={`tel:${parent.phone}`} className="text-blue-600 hover:underline flex items-center">
                          <Phone size={14} className="mr-1" />
                          {parent.phone}
                        </a>
                      </td>
                      <td className="py-3">
                        <a href={`mailto:${parent.email}`} className="text-blue-600 hover:underline flex items-center">
                          <Mail size={14} className="mr-1" />
                          {parent.email}
                        </a>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1 text-gray-400" />
                          {parent.address}
                        </div>
                      </td>
                      <td className="py-3">{parent.children}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 font-medium text-gray-700">Role</th>
                    <th className="text-left py-3 font-medium text-gray-700">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {adminDirectory.map((staff, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{staff.name}</td>
                      <td className="py-3">{staff.role}</td>
                      <td className="py-3">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                          {staff.contact}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const News = () => (
    <div className="space-y-6">
      {/* Latest Newsletter - Full */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">October 2024 Newsletter</h2>
            <span className="text-sm text-gray-500">Published Oct 20, 2024</span>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              Dear Montessori Families,
            </p>
            <p className="text-gray-700 mb-4">
              We hope this newsletter finds you well as we settle into the beautiful autumn season. The children have been embracing the changing weather and incorporating seasonal observations into their daily work.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">🍂 Classroom Highlights</h3>
            <p className="text-gray-700 mb-4">
              Our Primary students have been particularly drawn to leaf classification work, while our Elementary children are diving deep into the study of trees and their role in our ecosystem. The practical life activities have expanded to include seasonal food preparation, including apple slicing and pumpkin seed cleaning.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">📅 Upcoming Events</h3>
            <ul className="text-gray-700 mb-4 space-y-1">
              <li>• October 28: Fall Festival (6:00 PM - 8:00 PM)</li>
              <li>• November 1: Picture Day</li>
              <li>• November 5-8: Parent-Teacher Conferences</li>
              <li>• November 15: Family Dinner Night</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">🤝 Volunteer Opportunities</h3>
            <p className="text-gray-700 mb-4">
              We're still seeking volunteers for our monthly family dinner night. This is a wonderful opportunity to connect with other families while supporting our school community. Please reach out if you're interested in helping with setup, serving, or cleanup.
            </p>

            <p className="text-gray-700 mt-6">
              With gratitude,<br/>
              <strong>Mrs. Davis, Director</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Previous Newsletters */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Previous Newsletters</h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">September 2024 - Back to School Success</h4>
              <p className="text-gray-600 text-sm">Celebrating our successful start to the new school year, new student introductions, and upcoming fall activities...</p>
            </div>
            <button className="text-blue-600 hover:underline text-sm">Read →</button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">August 2024 - Welcome Back!</h4>
              <p className="text-gray-600 text-sm">Important reminders for the new school year, classroom updates, and teacher introductions...</p>
            </div>
            <button className="text-blue-600 hover:underline text-sm">Read →</button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">May 2024 - Spring Celebrations</h4>
              <p className="text-gray-600 text-sm">End of year activities, graduation preparations, and summer program information...</p>
            </div>
            <button className="text-blue-600 hover:underline text-sm">Read →</button>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <button className="text-blue-600 hover:underline text-sm">
            View All Archived Newsletters →
          </button>
        </div>
      </div>
    </div>
  );

  const Forms = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">School Forms & Documents</h3>
        </div>
        <div className="p-4 space-y-4">
          {forms.map((form, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium">{form.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    form.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    form.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {form.status}
                  </span>
                </div>
                {form.dueDate && (
                  <p className="text-red-600 text-sm mt-1">Due: {form.dueDate}</p>
                )}
              </div>
              
              <div className="flex space-x-2">
                {form.type === 'form' ? (
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Edit3 size={14} className="mr-1" />
                    {form.status === 'completed' ? 'View' : 'Fill Out'}
                  </button>
                ) : (
                  <button className="flex items-center px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 text-sm">
                    <Eye size={14} className="mr-1" />
                    View PDF
                  </button>
                )}
                
                <button className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                  <Download size={14} className="mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const VolunteerTracking = () => {
    const [showLogForm, setShowLogForm] = useState(false);
    const [showTeamComms, setShowTeamComms] = useState(false);

    const volunteerLogs = [
      { id: 1, date: '2024-10-20', activity: 'Fall Festival Setup', hours: 3, status: 'approved', category: 'Fundraising' },
      { id: 2, date: '2024-10-15', activity: 'Classroom Reading Helper', hours: 1.5, status: 'approved', category: 'Classroom' },
      { id: 3, date: '2024-10-10', activity: 'PTO Meeting Attendance', hours: 1, status: 'approved', category: 'Board Meeting' },
      { id: 4, date: '2024-10-08', activity: 'Art Supply Organization', hours: 2, status: 'pending', category: 'Material Preparations' },
      { id: 5, date: '2024-10-05', activity: 'Field Trip Supervision', hours: 4, status: 'approved', category: 'Outing' }
    ];

    const upcomingOpportunities = [
      { 
        id: 1, 
        title: 'Dinner Night Team', 
        date: 'Nov 15, 2024', 
        type: 'team', 
        hoursNeeded: 4, 
        description: 'Help with setup, serving, and cleanup for monthly family dinner',
        spotsTotal: 8,
        spotsFilled: 3,
        coordinator: 'Sarah Johnson',
        isSignedUp: true,
        category: 'Fundraising'
      },
      { 
        id: 2, 
        title: 'Picture Day Assistant', 
        date: 'Nov 1, 2024', 
        type: 'individual', 
        hoursNeeded: 2, 
        description: 'Help organize children and assist photographer',
        spotsTotal: 2,
        spotsFilled: 1,
        coordinator: 'Ms. Davis',
        category: 'Other'
      }
    ];

    const teamMessages = [
      { from: 'Sarah Johnson', message: 'Great job everyone at the last dinner night! For November, we\'ll need to prep for 45 families.', time: '2 hours ago' },
      { from: 'Amanda Williams', message: 'I can bring extra serving utensils. Should I coordinate with the kitchen team?', time: '1 day ago' }
    ];

    const totalHours = volunteerLogs.filter(log => log.status === 'approved').reduce((sum, log) => sum + log.hours, 0);
    const requiredHours = 20;
    const pendingHours = volunteerLogs.filter(log => log.status === 'pending').reduce((sum, log) => sum + log.hours, 0);

    const categories = ['Fundraising', 'Outing', 'Classroom', 'Board Meeting', 'Material Preparations', 'Other'];

    return (
      <div className="space-y-6">
        {/* Volunteer Summary */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{totalHours}</div>
            <div className="text-sm text-gray-600">Hours Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{requiredHours}</div>
            <div className="text-sm text-gray-600">Hours Required</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{pendingHours}</div>
            <div className="text-sm text-gray-600">Hours Pending</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.max(0, requiredHours - totalHours)}</div>
            <div className="text-sm text-gray-600">Hours Remaining</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Annual Progress</span>
            <span className="text-sm text-gray-500">{totalHours}/{requiredHours} hours</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (totalHours / requiredHours) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setShowLogForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Clock size={16} className="mr-2" />
              Log Volunteer Hours
            </button>
            <button 
              onClick={() => setShowTeamComms(true)}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <MessageSquare size={16} className="mr-2" />
              Team Communications
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download size={16} className="mr-2" />
              Export Hours Report
            </button>
          </div>
        </div>

        {/* Volunteer Opportunities */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">Available Opportunities</h3>
          </div>
          <div className="p-4 space-y-4">
            {upcomingOpportunities.map((opp) => (
              <div key={opp.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium">{opp.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        opp.type === 'team' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {opp.type === 'team' ? 'Team Activity' : 'Individual'}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                        {opp.category}
                      </span>
                      {opp.isSignedUp && (
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          Signed Up
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{opp.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📅 {opp.date}</span>
                      <span>⏱️ {opp.hoursNeeded} hours</span>
                      <span>👥 {opp.spotsFilled}/{opp.spotsTotal} filled</span>
                      <span>👤 Coordinator: {opp.coordinator}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {opp.isSignedUp ? (
                      <>
                        {opp.type === 'team' && (
                          <button 
                            onClick={() => setShowTeamComms(true)}
                            className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                          >
                            Team Chat
                          </button>
                        )}
                        <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                        Sign Up
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteer History */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">Volunteer History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Activity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Hours</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {volunteerLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{log.date}</td>
                    <td className="py-3 px-4 font-medium">{log.activity}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                        {log.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">{log.hours}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        log.status === 'approved' ? 'bg-green-100 text-green-800' :
                        log.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Log Hours Form Modal */}
        {showLogForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Log Volunteer Hours</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input 
                    type="date" 
                    className="w-full border rounded-lg px-3 py-2" 
                    defaultValue="2024-10-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full border rounded-lg px-3 py-2">
                    <option value="">Select a category...</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activity Description</label>
                  <input 
                    type="text" 
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Describe what you did..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hours</label>
                  <input 
                    type="number" 
                    step="0.5"
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g. 2.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select className="w-full border rounded-lg px-3 py-2">
                    <option>On-site</option>
                    <option>Off-site</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea 
                    className="w-full border rounded-lg px-3 py-2 h-20"
                    placeholder="Additional details, notes, or comments..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Submit for Approval
                  </button>
                  <button 
                    onClick={() => setShowLogForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Communications Modal */}
        {showTeamComms && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl h-96">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Dinner Night Team - Communications</h3>
                <button 
                  onClick={() => setShowTeamComms(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="h-64 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">
                <div className="space-y-3">
                  {teamMessages.map((msg, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{msg.from}</span>
                        <span className="text-gray-500 text-xs">{msg.time}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  className="flex-1 border rounded-lg px-3 py-2"
                  placeholder="Type your message to the team..."
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const SettingsPage = () => (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Notification Preferences</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span>Receive alerts via Email</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span>Receive Push Notifications</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span>Receive Text Messages</span>
            <input type="checkbox" className="rounded" />
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Profile Information</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={32} className="text-gray-400" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Upload Profile Picture
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" defaultValue="(555) 123-4567" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input type="email" defaultValue="sarah.johnson@email.com" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input type="text" defaultValue="123 Maple Street, Portland, OR 97201" className="w-full border rounded-lg px-3 py-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Emergency Contacts</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Contact 1</h4>
              <button className="text-blue-600 text-sm hover:underline">Edit</button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600">Name</label>
                <p className="font-medium">John Johnson</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Relationship</label>
                <p className="font-medium">Father</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Phone</label>
                <p className="font-medium">(555) 123-4568</p>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            + Add Emergency Contact
          </button>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Quick Actions Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Clock size={16} className="mr-2" />
            Quick Check-In
          </button>
          <button 
            onClick={() => setActiveSection('communication')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <MessageSquare size={16} className="mr-2" />
            Messages (2)
          </button>
          <button 
            onClick={() => setActiveSection('forms')}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            <FileText size={16} className="mr-2" />
            Forms Due (1)
          </button>
          <div className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg">
            <Users size={16} className="mr-2" />
            Volunteer Hrs: 12/20
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
        <div className="flex items-center">
          <AlertTriangle className="text-yellow-600 mr-3" size={20} />
          <div>
            <h3 className="font-medium text-yellow-800">Snack Day Tomorrow!</h3>
            <p className="text-yellow-700 text-sm">Emma's snack day and show & tell is tomorrow. Don't forget to pack extra snacks!</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Latest Newsletter */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">Latest Newsletter</h3>
          </div>
          <div className="p-4">
            <h4 className="font-medium mb-2">October 2024 - Fall Updates</h4>
            <p className="text-gray-600 text-sm mb-3">Dear families, we're excited to share updates about our fall activities, upcoming events, and classroom highlights...</p>
            <button 
              onClick={() => setActiveSection('news')}
              className="text-blue-600 text-sm hover:underline"
            >
              Read Full Newsletter →
            </button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">Upcoming Events</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Emma's Snack Day & Show and Tell</p>
                <p className="text-gray-500 text-xs">Tomorrow</p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">alert</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Fall Festival</p>
                <p className="text-gray-500 text-xs">Oct 28</p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">event</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Picture Day</p>
                <p className="text-gray-500 text-xs">Nov 1</p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">event</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Parent-Teacher Conferences</p>
                <p className="text-gray-500 text-xs">Nov 5</p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">meeting</div>
            </div>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-white rounded-lg shadow-sm border md:col-span-2">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">Recent Updates</h3>
          </div>
          <div className="p-4 space-y-4">
            {[
              {
                child: 'Emma',
                type: 'photo',
                content: 'Working with the Pink Tower',
                time: '2 hours ago',
                teacher: 'Ms. Rodriguez'
              },
              {
                child: 'Noah', 
                type: 'observation',
                content: 'Showed great concentration during math work',
                time: '1 day ago',
                teacher: 'Mr. Thompson'
              },
              {
                child: 'Emma',
                type: 'milestone',
                content: 'Mastered sound games!',
                time: '2 days ago', 
                teacher: 'Ms. Rodriguez'
              }
            ].map((update, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">{children[update.child.toLowerCase()].photo}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">{update.child}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      update.type === 'photo' ? 'bg-green-100 text-green-700' :
                      update.type === 'milestone' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {update.type}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{update.content}</p>
                  <p className="text-gray-500 text-xs mt-1">{update.time} • {update.teacher}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ChildProfile = () => {
    const child = children[activeChild];
    return (
      <div className="space-y-6">
        {/* Child Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-4">
            <div className="text-6xl">{child.photo}</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{child.name}</h2>
              <p className="text-gray-600">{child.classroom}</p>
              <p className="text-sm text-gray-500">Last check-in: {child.lastCheckIn}</p>
            </div>
            <div className="ml-auto">
              {child.snackDay === 'tomorrow' && (
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Snack Day Tomorrow!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-gray-600">Attendance</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{child.recentUpdates}</div>
            <div className="text-sm text-gray-600">New Updates</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">15</div>
            <div className="text-sm text-gray-600">Photos This Week</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">8</div>
            <div className="text-sm text-gray-600">Lessons Mastered</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {['Progress', 'Photos', 'Attendance', 'Reports'].map((tab) => (
                <button
                  key={tab}
                  className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            <div className="text-center py-8 text-gray-500">
              <Camera size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Select a tab to view {child.name}'s information</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'children': return <ChildProfile />;
      case 'communication': return <Communication />;
      case 'calendar': return <CalendarView />;
      case 'pto': return <PTOSection />;
      case 'directory': return <Directory />;
      case 'news': return <News />;
      case 'forms': return <Forms />;
      case 'volunteer': return <VolunteerTracking />;
      case 'settings': return <SettingsPage />;
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="text-gray-400 mb-4">
              <FileText size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
            </h3>
            <p className="text-gray-500">This section is under development in the demo.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Parent Portal</h2>
          <p className="text-sm text-gray-600">Johnson Family</p>
        </div>
        
        <nav className="p-4 space-y-2">
          <SidebarItem icon={Home} label="Dashboard" id="dashboard" />
          
          <SidebarItem 
            icon={User} 
            label="My Children" 
            id="children"
            children={[
              { id: 'emma', name: 'Emma', photo: '👧', hasUpdates: true },
              { id: 'noah', name: 'Noah', photo: '👦', hasUpdates: false }
            ]}
          />
          
          <SidebarItem icon={DollarSign} label="Tuition" id="tuition" />
          <SidebarItem icon={MessageSquare} label="Communication" id="communication" hasAlert={true} />
          <SidebarItem icon={Calendar} label="Calendar" id="calendar" />
          <SidebarItem icon={FileText} label="Forms & Documents" id="forms" hasAlert={true} />
          <SidebarItem icon={Clock} label="Volunteer Tracking" id="volunteer" />
          <SidebarItem icon={Users} label="PTO/School Community" id="pto" />
          <SidebarItem icon={BookOpen} label="Directory" id="directory" />
          <SidebarItem icon={Bell} label="News & Updates" id="news" />
          <SidebarItem icon={Settings} label="Settings" id="settings" />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ParentPortalDemo;