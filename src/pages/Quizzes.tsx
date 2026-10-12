import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { BookOpen, Plus, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';

export default function Quizzes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { quizzes, courses, addQuiz, hasStudentAttempted, getStudentAttempts } = useData();
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [quizForm, setQuizForm] = useState({
    title: '',
    description: '',
    courseId: '',
    duration: 30,
    questions: [
      { id: '1', question: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]
  });

  const isFaculty = user?.role === 'faculty';
  const isStudent = user?.role === 'student';

  // Get quizzes based on user role
  const availableQuizzes = isStudent && user
    ? quizzes.filter(q => {
        const studentCourses = courses.filter(c => {
          // Check if student is enrolled in this course
          return true; // Simplified - in real app, check enrollments
        });
        return studentCourses.some(c => c.id === q.courseId);
      })
    : isFaculty && user
    ? quizzes.filter(q => q.createdBy === user.id)
    : [];

  const handleAddQuestion = () => {
    setQuizForm({
      ...quizForm,
      questions: [
        ...quizForm.questions,
        { id: Date.now().toString(), question: '', options: ['', '', '', ''], correctAnswer: 0 }
      ]
    });
  };

  const handleRemoveQuestion = (index: number) => {
    setQuizForm({
      ...quizForm,
      questions: quizForm.questions.filter((_, i) => i !== index)
    });
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...quizForm.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuizForm({ ...quizForm, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updatedQuestions = [...quizForm.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuizForm({ ...quizForm, questions: updatedQuestions });
  };

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addQuiz({
      title: quizForm.title,
      description: quizForm.description,
      courseId: quizForm.courseId,
      duration: quizForm.duration,
      questions: quizForm.questions,
      createdBy: user.id,
      isActive: true
    });

    setShowCreateForm(false);
    setQuizForm({
      title: '',
      description: '',
      courseId: '',
      duration: 30,
      questions: [{ id: '1', question: '', options: ['', '', '', ''], correctAnswer: 0 }]
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1a2744] mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to access quizzes.</p>
          <a href="#/login" className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
            Login to Continue
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#1a2744] mb-2">
              {isFaculty ? 'Manage Quizzes' : 'Available Quizzes'}
            </h1>
            <p className="text-gray-600">
              {isFaculty ? 'Create and manage quizzes for your students' : 'Take quizzes and test your knowledge'}
            </p>
          </div>
          {isFaculty && (
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Quiz
            </button>
          )}
        </div>

        {/* Create Quiz Form */}
        {showCreateForm && isFaculty && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#1a2744] mb-6">Create New Quiz</h2>
            <form onSubmit={handleCreateQuiz} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quiz Title</label>
                  <input
                    type="text"
                    required
                    value={quizForm.title}
                    onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Enter quiz title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Course</label>
                  <select
                    required
                    value={quizForm.courseId}
                    onChange={(e) => setQuizForm({ ...quizForm, courseId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                  >
                    <option value="">Select Course</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={quizForm.description}
                  onChange={(e) => setQuizForm({ ...quizForm, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  rows={3}
                  placeholder="Enter quiz description"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={quizForm.duration}
                  onChange={(e) => setQuizForm({ ...quizForm, duration: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Questions */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#1a2744]">Questions ({quizForm.questions.length})</h3>
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-200 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Question
                  </button>
                </div>

                {quizForm.questions.map((q, qIndex) => (
                  <div key={q.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-[#1a2744]">Question {qIndex + 1}</h4>
                      {quizForm.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(qIndex)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
                        <textarea
                          required
                          value={q.question}
                          onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                          rows={2}
                          placeholder="Enter your question"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                        <div className="space-y-2">
                          {q.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center gap-3">
                              <input
                                type="radio"
                                name={`correct-${q.id}`}
                                checked={q.correctAnswer === oIndex}
                                onChange={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                                className="w-5 h-5 text-emerald-600"
                              />
                              <input
                                type="text"
                                required
                                value={option}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Select the radio button next to the correct answer</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Create Quiz
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Quiz List */}
        {availableQuizzes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {isFaculty ? 'No quizzes created yet. Create your first quiz!' : 'No quizzes available yet.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableQuizzes.map(quiz => {
              const course = courses.find(c => c.id === quiz.courseId);
              const attempted = isStudent && user ? hasStudentAttempted(quiz.id, user.id) : false;
              const attempts = isStudent && user ? getStudentAttempts(user.id).filter(a => a.quizId === quiz.id) : [];
              const latestAttempt = attempts[0];

              return (
                <div key={quiz.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    {attempted && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Completed
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#1a2744] mb-2">{quiz.title}</h3>
                  {course && <p className="text-sm text-gray-600 mb-3">{course.name}</p>}
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{quiz.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {quiz.questions.length} Questions
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {quiz.duration} min
                    </div>
                  </div>

                  {attempted && latestAttempt && (
                    <div className="bg-emerald-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-emerald-700 font-semibold">
                        Your Score: {latestAttempt.score}/{latestAttempt.totalQuestions}
                      </p>
                    </div>
                  )}

                  {isStudent && (
                    <button
                      onClick={() => navigate(`/quiz/${quiz.id}`)}
                      disabled={attempted}
                      className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {attempted ? 'Already Attempted' : 'Start Quiz'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
