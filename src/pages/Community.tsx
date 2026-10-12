import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { MessageSquare, Send, Bell, Users, Clock, AlertCircle } from 'lucide-react';

export default function Community() {
  const { user } = useAuth();
  const { communityMessages, addCommunityMessage, sendNotification, notifications, users } = useData();
  const [newMessage, setNewMessage] = useState('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationContent, setNotificationContent] = useState('');
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const isAdmin = user?.role === 'admin';

  // Check if user is logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <Users className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1a2744] mb-2">Join the Community</h2>
          <p className="text-gray-600 mb-6">Please login to access the community features and connect with fellow medical aspirants.</p>
          <a href="#/login" className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
            Login to Continue
          </a>
        </div>
      </div>
    );
  }

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    addCommunityMessage({
      content: newMessage,
      authorId: user.id,
      authorName: user.name,
    });

    setNewMessage('');
    setSuccessMessage('Message posted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationTitle.trim() || !notificationContent.trim() || !user) return;

    sendNotification({
      title: notificationTitle,
      content: notificationContent,
      sentBy: user.id,
    });

    setNotificationTitle('');
    setNotificationContent('');
    setShowNotificationForm(false);
    setSuccessMessage('Notification sent to all members!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Combine messages and notifications into a unified feed
  const combinedFeed = [
    ...communityMessages.map(msg => ({
      type: 'message' as const,
      id: msg.id,
      authorName: msg.authorName,
      content: msg.content,
      createdAt: msg.createdAt,
    })),
    ...notifications.map(notif => {
      const sender = users.find(u => u.id === notif.sentBy);
      return {
        type: 'notification' as const,
        id: notif.id,
        authorName: sender?.name || 'Admin',
        title: notif.title,
        content: notif.content,
        createdAt: notif.createdAt,
      };
    }),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a2744] via-[#1e3a5f] to-[#0d4a4a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Community</h1>
              <p className="text-emerald-200">Connect with fellow medical aspirants</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {successMessage}
          </div>
        )}

        {/* Admin Controls */}
        {isAdmin && (
          <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-[#1a2744] mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-600" />
              Admin Controls
            </h2>
            <button
              onClick={() => setShowNotificationForm(!showNotificationForm)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Notification to All Members
            </button>

            {showNotificationForm && (
              <form onSubmit={handleSendNotification} className="mt-6 space-y-4 p-6 bg-gray-50 rounded-xl">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notification Title</label>
                  <input
                    type="text"
                    required
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Enter notification title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notification Content</label>
                  <textarea
                    required
                    value={notificationContent}
                    onChange={(e) => setNotificationContent(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                    rows={4}
                    placeholder="Enter notification content"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Notification
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNotificationForm(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Post Message (All Users) */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#1a2744] mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            Post a Message
          </h2>
          <form onSubmit={handlePostMessage} className="space-y-4">
            <textarea
              required
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              rows={4}
              placeholder="Share your thoughts, questions, or updates with the community..."
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Post Message
            </button>
          </form>
        </div>

        {/* Community Feed (Messages + Notifications) */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#1a2744] mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            Community Feed ({combinedFeed.length})
          </h2>

          {combinedFeed.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No messages or notifications yet</p>
              <p className="text-gray-400 text-sm mt-2">Be the first to post a message!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {combinedFeed.map((item) => (
                item.type === 'notification' ? (
                  // Notification Card
                  <div key={`notif-${item.id}`} className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg">
                        <Bell className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                            NOTIFICATION
                          </span>
                          <h3 className="font-semibold text-[#1a2744]">{item.authorName}</h3>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(item.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-[#1a2744] mb-2">{item.title}</h4>
                        <p className="text-gray-700 leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Message Card
                  <div key={`msg-${item.id}`} className="p-6 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {item.authorName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-[#1a2744]">{item.authorName}</h3>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(item.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
