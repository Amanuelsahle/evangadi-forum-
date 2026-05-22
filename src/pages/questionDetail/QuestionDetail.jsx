import classes from "./questionDetail.module.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import instance from "../../axiosConfig/axiosConfig";
import { FaUserCircle } from "react-icons/fa";

function QuestionDetail() {
  const { id } = useParams();
  const newAnswerRef = useRef();

  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  async function getAnswers() {
    try {
      const { data } = await instance.get("/answers/all-answers", {
        params: { questionid: id },
      });
      setAnswers(data);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    async function getQuestion() {
      try {
        const { data } = await instance.get("/questions/question", {
          params: { questionid: id },
        });
        setQuestion(data.question);
      } catch (error) {
        console.log(error.response);
      }
    }

    getQuestion();
    getAnswers();
  }, []);
  // console.log(answers);

  async function addAnswer(e) {
    e.preventDefault();
    const newAnswer = newAnswerRef.current.value;
    if (!newAnswer) {
      alert("please enter an answer");
    }
    try {
      await instance.post("/answers/add-answer", {
        answer: newAnswer,
        questionid: id,
      });
      newAnswerRef.current.value = ""; // Clear the input
      await getAnswers(); // <--- This triggers the immediate re-render
      // alert("answer added successfuly");
    } catch (error) {
      console.log(error.response?.data?.msg);
    }
  }
  return (
    <section className={classes.container}>
      <div className={classes.inner_container}>
        <div className={classes.question}>
          <h3>Question</h3>
          <p style={{ fontWeight: "bold", fontSize: 18 }}>{question.title}</p>
          <p style={{ fontSize: 14 }}>{question.description}</p>
        </div>

        <h2>Answers From The Community</h2>
        {answers?.answers?.map((answer, i) => {
          return (
            <div key={i} className={classes.answer}>
              <div className={classes.question_user}>
                <FaUserCircle size={"70px"} />
                <p>{answer.username}</p>
              </div>
              <p>{answer.answer}</p>
            </div>
          );
        })}
        <div className={classes.answer_form}>
          <h3>Answer The Top Question</h3>
          <Link to={"/"}>Go to Question page</Link>
          <form onSubmit={addAnswer}>
            <div>
              <textarea
                ref={newAnswerRef}
                placeholder="enter your answer"
              ></textarea>
            </div>
            <button type="submit">Post Your Answer</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default QuestionDetail;
