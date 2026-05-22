import classes from "./askQuestion.module.css";
import React, { useRef } from "react";
import instance from "../../axiosConfig/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

function AskQuestion() {
  const navigate = useNavigate();

  const newQuestionRef = useRef();
  const questionDescriptionRef = useRef();
  async function addQuestions(e) {
    e.preventDefault();

    const newQuestion = newQuestionRef.current.value;
    const questionDescription = questionDescriptionRef.current.value;
    if (!newQuestion) {
      alert("please enter a question");
    }
    try {
      await instance.post("/questions/add-question", {
        title: newQuestion,
        description: questionDescription,
      });
      alert("question added successfuly");
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response);
    }
  }
  return (
    <section className={classes.container}>
      <div className={classes.inner_container}>
        <div className={classes.goodQuestion}>
          <h3>Steps to write a good question</h3>
          <ul>
            <li>Summerize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <div className={classes.ask}>
          <h3>Ask a public Question</h3>
          <div>
            <Link to={"/"}>Go to Question page</Link>
          </div>

          <form onSubmit={addQuestions}>
            <div>
              <input ref={newQuestionRef} type="text" placeholder="Title" />
            </div>

            <div>
              <textarea
                ref={questionDescriptionRef}
                type="text"
                placeholder="question description"
              ></textarea>
            </div>

            <button type="submit">Add Question</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AskQuestion;
