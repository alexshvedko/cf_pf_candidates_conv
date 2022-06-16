import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Card, Layout, Radio} from 'element-react'
import {QUESTIONS} from "./questions";

const questionerScores = JSON.parse(localStorage.getItem('questioner')) || []
const runsCount = questionerScores.length

function App() {
    const [answers, setAnswer] = useState({})
    const [score, setScore] = useState([])

    const totalScore = useMemo(() => {
        return score.reduce((acc, num) => acc + num, 0)
    }, [score])

    const averageScore = useMemo(() => {
        const totalRunsScore = questionerScores.reduce((acc, num) => acc + num, 0)
        if (!totalRunsScore && !runsCount) return 0
        return (totalRunsScore / runsCount).toFixed(0)
    }, [])

    const questionsLength = useMemo(() => {
        return Object.values(QUESTIONS).length
    }, [QUESTIONS])

    const saveQuestionerScore = useCallback(() => {
        const index = runsCount === 0 ? 0 : runsCount
        questionerScores[index] = totalScore

        localStorage.setItem('questioner', JSON.stringify(questionerScores))
    }, [totalScore])

    const handleAnswer = useCallback((id, answer) => {
        const updAnswers = { ...answers, [id]: answer }
        setAnswer(updAnswers)

        switch (answer) {
            case "Yes":
                const yesAnswersCount = Object.values(updAnswers).filter(ans => ans === "Yes").length || 1
                const newScore = (100 * (yesAnswersCount / questionsLength))
                setScore([...score, newScore])
                break
            case "No":
                setScore(score.slice(0, -1))
        }
    }, [answers, score])

    useEffect(() => {
        const questionsIds = Object.keys(QUESTIONS)
        setAnswer(questionsIds.reduce((acc, key) => ({ ...acc, [key]: "No" }), {}))
    }, [])

    useEffect(() => {
        saveQuestionerScore()
    }, [totalScore])

    return (
        <div className="main__wrap">
            <main className="container">
                <Layout.Row gutter={10}>
                    <Layout.Col span="12">
                        <Card className="box-card">
                            <h3 className="card-title">Score</h3>
                            <span>{totalScore}</span>
                        </Card>
                    </Layout.Col>
                    <Layout.Col span="12">
                        <Card className="box-card">
                            <h3 className="card-title">Average score in {runsCount} runs</h3>
                            <span>{averageScore}</span>
                        </Card>
                    </Layout.Col>
                </Layout.Row>
                <Card className="box-card questions-list">
                    {Object.entries(QUESTIONS).map(([id, text]) => (
                        <Layout.Row className="questions-list-item" gutter={10} key={id} align="center">
                            <Layout.Col span="18">{text}</Layout.Col>
                            <Layout.Col span="6">
                                <Radio.Group
                                    value={answers[id]}
                                    onChange={(value) => handleAnswer(id, value)}
                                >
                                    <Radio.Button value="Yes" />
                                    <Radio.Button value="No" />
                                </Radio.Group>
                            </Layout.Col>
                        </Layout.Row>
                    ))}
                </Card>
            </main>
        </div>
    );
}

export default App;
