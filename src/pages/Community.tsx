import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { MessageSquare, Send, Bell, Users, Clock, AlertCircle } from 'lucide-react';

export default function Community() {
  const { user } = useAuth();
  const { communityMessages, addCommunityMessage, sendNotification } = useData();
  const [newMessage, setNewMessage] = useState('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationContent, setNotificationContent] = useState('');
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const isAdmin = user?.role === 'admin';

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

        {/* Community Messages */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#1a2744] mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            Community Messages ({communityMessages.length})
          </h2>

          {communityMessages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No messages yet</p>
              <p className="text-gray-400 text-sm mt-2">Be the first to post a message!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {communityMessages.map((message: any) => (
                <div key={message.id} className="p-6 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {message.authorName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-[#1a2744]">{message.authorName}</h3>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(message.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
