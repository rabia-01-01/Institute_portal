import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Clock, AlertTriangle, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export default function QuizTake() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getQuizById, submitQuizAttempt, hasStudentAttempted, courses } = useData();
  
  const quiz = id ? getQuizById(id) : null;
  const course = quiz ? courses.find(c => c.id === quiz.courseId) : null;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [startTime, setStartTime] = useState(0);

  // Check if user has already attempted this quiz
  const hasAttempted = user && quiz ? hasStudentAttempted(quiz.id, user.id) : false;

  // Anti-cheating: Detect tab switches
  useEffect(() => {
    if (!quizStarted || quizSubmitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(prev => prev + 1);
      }
    };

    const handleBlur = () => {
      setTabSwitchCount(prev => prev + 1);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [quizStarted, quizSubmitted]);

  // Timer
  useEffect(() => {
    if (!quizStarted || quizSubmitted || !quiz) return;

    setTimeLeft(quiz.duration * 60);
    setStartTime(Date.now());

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizSubmitted, quiz]);

  const handleStartQuiz = () => {
    if (!user || !quiz) return;
    if (hasAttempted) {
      alert('You have already attempted this quiz.');
      return;
    }
    setQuizStarted(true);
  };

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (!user || !quiz) return;

    let correctAnswers = 0;
    const answerArray = quiz.questions.map(q => ({
      questionId: q.id,
      selectedOption: answers[q.id] || -1
    }));

    quiz.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctAnswers++;
      }
    });

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    submitQuizAttempt({
      quizId: quiz.id,
      studentId: user.id,
      answers: answerArray,
      score: correctAnswers,
      totalQuestions: quiz.questions.length,
      timeTaken
    });

    setScore(correctAnswers);
    setQuizSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertTriangle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1a2744] mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to take the quiz.</p>
          <a href="#/login" className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
            Login to Continue
          </a>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1a2744] mb-2">Quiz Not Found</h2>
          <p className="text-gray-600 mb-6">The quiz you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (hasAttempted && !quizSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1a2744] mb-2">Already Attempted</h2>
          <p className="text-gray-600 mb-6">You have already attempted this quiz.</p>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#1a2744] mb-2">{quiz.title}</h1>
              {course && <p className="text-gray-600">{course.name}</p>}
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{quiz.questions.length}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{quiz.duration}</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">MCQ</div>
                <div className="text-sm text-gray-600">Format</div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Important Instructions
              </h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• Once started, the timer cannot be paused</li>
                <li>• Do not switch tabs or windows during the quiz</li>
                <li>• Tab switching will be recorded and may result in disqualification</li>
                <li>• Quiz will auto-submit when time expires</li>
                <li>• You can only attempt this quiz once</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button onClick={() => navigate(-1)} className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all">
                Cancel
              </button>
              <button onClick={handleStartQuiz} className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizSubmitted) {
    const percentage = (score / quiz.questions.length) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <CheckCircle className="w-20 h-20 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#1a2744] mb-2">Quiz Completed!</h2>
            <p className="text-gray-600 mb-6">Your quiz has been submitted successfully.</p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-50 rounded-xl p-6">
                <div className="text-4xl font-bold text-emerald-600 mb-2">{score}/{quiz.questions.length}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">{percentage.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">{tabSwitchCount}</div>
                <div className="text-sm text-gray-600">Tab Switches</div>
              </div>
            </div>

            {tabSwitchCount > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-800">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  You switched tabs {tabSwitchCount} time(s) during the quiz.
                </p>
              </div>
            )}

            <button onClick={() => navigate('/')} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with Timer */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1a2744]">{quiz.title}</h1>
              <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {quiz.questions.length}</p>
            </div>
            <div className="flex items-center gap-4">
              {tabSwitchCount > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-700">{tabSwitchCount} tab switch{tabSwitchCount > 1 ? 'es' : ''}</span>
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="text-lg font-bold text-red-600">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-[#1a2744] mb-6">{question.question}</h2>
          
          <div className="space-y-3">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(question.id, index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  answers[question.id] === index
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    answers[question.id] === index
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(quiz.questions.length - 1, prev + 1))}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
