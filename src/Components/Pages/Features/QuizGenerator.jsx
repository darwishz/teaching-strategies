// src/Components/Pages/Features/QuizGenerator.jsx
import React, { useState } from 'react'
import { Link }             from 'react-router-dom'
import { db }               from '../../../firebaseConfig'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import '../../css/quiz-generator.css'

export default function QuizGenerator() {
  // one question looks like: { text:'', options:['',''], correct:0 }
  const [questions, setQuestions] = useState([
    { text: '', options: ['', ''], correct: 0 }
  ])
  const [mode, setMode]     = useState('edit')      // 'edit' or 'preview'
  const [answers, setAnswers] = useState({})        // { qIdx: chosenOptionIdx }
  const [msg, setMsg]       = useState(null)        // { type:'success'|'error', text }

  // ——— EDIT MODE HANDLERS ———
  const handleQuestionText = (qIdx, val) => {
    const qs = [...questions]
    qs[qIdx].text = val
    setQuestions(qs)
  }
  const handleOptionText = (qIdx, oIdx, val) => {
    const qs = [...questions]
    qs[qIdx].options[oIdx] = val
    setQuestions(qs)
  }
  const markCorrect = (qIdx, oIdx) => {
    const qs = [...questions]
    qs[qIdx].correct = oIdx
    setQuestions(qs)
  }
  const addOption = qIdx => {
    const qs = [...questions]
    qs[qIdx].options.push('')
    setQuestions(qs)
  }
  const removeOption = (qIdx, oIdx) => {
    const qs = [...questions]
    if (qs[qIdx].options.length <= 2) return
    qs[qIdx].options.splice(oIdx, 1)
    if (qs[qIdx].correct >= qs[qIdx].options.length) {
      qs[qIdx].correct = 0
    }
    setQuestions(qs)
  }
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', options: ['', ''], correct: 0 }
    ])
  }
  const removeQuestion = qIdx => {
    if (questions.length <= 1) return
    setQuestions(questions.filter((_, i) => i !== qIdx))
  }

  // ——— SAVE QUIZ ———
  const saveQuiz = async () => {
    try {
      await addDoc(collection(db, 'quizzes'), {
        questions,
        createdAt: Timestamp.now()
      })
      setMsg({ type:'success', text:'Quiz saved successfully!' })
    } catch (err) {
      console.error(err)
      setMsg({ type:'error', text:'Error saving quiz. Please try again.' })
    }
    // clear notification after 3s
    setTimeout(() => setMsg(null), 3000)
  }

  // ——— PREVIEW MODE HANDLERS ———
  const selectAnswer = (qIdx, oIdx) => {
    setAnswers({ ...answers, [qIdx]: oIdx })
  }
  const submitQuiz = () => {
    let score = 0
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) score++
    })
    alert(`You scored ${score} out of ${questions.length}`)
  }

  return (
    <div className="quiz-gen-layout">
      <div className="quiz-gen-card">
        {/* ← BACK BUTTON */}
        <Link to="/features" className="quiz-gen-back-btn">
          ← Back to Features
        </Link>

        {msg && (
          <div className={`notification-box ${msg.type}`}>
            {msg.text}
          </div>
        )}

        {mode === 'edit' ? (
          <>
            <h1>Create Your Quiz</h1>
            {questions.map((q, qi) => (
              <div className="quiz-gen-question" key={qi}>
                <div className="q-header">
                  <span>Q{qi+1}:</span>
                  <button onClick={()=>removeQuestion(qi)} className="small-btn">
                    ✕
                  </button>
                </div>
                <textarea
                  className="q-text"
                  placeholder="Enter question text"
                  value={q.text}
                  onChange={e=>handleQuestionText(qi, e.target.value)}
                />
                {q.options.map((opt, oi) => (
                  <div className="q-option" key={oi}>
                    <input
                      type="radio"
                      name={`correct-${qi}`}
                      checked={q.correct===oi}
                      onChange={()=>markCorrect(qi,oi)}
                    />
                    <input
                      type="text"
                      placeholder={`Option ${oi+1}`}
                      value={opt}
                      onChange={e=>handleOptionText(qi,oi,e.target.value)}
                    />
                    <button onClick={()=>removeOption(qi,oi)} className="small-btn">
                      –
                    </button>
                  </div>
                ))}
                <button onClick={()=>addOption(qi)} className="add-opt-btn">
                  + Add Option
                </button>
              </div>
            ))}

            <div className="quiz-gen-actions">
              <button onClick={addQuestion} className="action-btn">
                + Add Question
              </button>
              <button onClick={saveQuiz} className="action-btn">
                💾 Save Quiz
              </button>
              <button onClick={()=>setMode('preview')} className="action-btn">
                Preview Quiz
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>Take Your Quiz</h1>
            {questions.map((q, qi) => (
              <div className="quiz-gen-question" key={qi}>
                <div className="q-header">
                  <span>Q{qi+1}:</span>
                </div>
                <div className="q-text">{q.text}</div>
                {q.options.map((opt, oi) => (
                  <label key={oi} className="q-option">
                    <input
                      type="radio"
                      name={`ans-${qi}`}
                      checked={answers[qi]===oi}
                      onChange={()=>selectAnswer(qi,oi)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            ))}

            <div className="quiz-gen-actions">
              <button onClick={submitQuiz} className="action-btn">
                Submit Quiz
              </button>
              <button onClick={()=>setMode('edit')} className="action-btn">
                Back to Edit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
