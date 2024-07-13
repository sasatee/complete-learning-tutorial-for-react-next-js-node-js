import React from 'react'
import quiz from "../assets/quiz-complete.png"

export default function Header() {
    return (
        <header>
            <img src={quiz} alt="logo-quiz" />
            <h1>
                React logo
            </h1>

        </header>
    )
}
