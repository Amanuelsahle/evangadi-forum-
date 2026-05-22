import React, { useContext, useEffect, useState } from "react";
import classes from "./home.module.css";
import { AppState } from "../../App";
import { useNavigate, Link, useParams } from "react-router-dom";
import instance from "../../axiosConfig/axiosConfig";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

function Home() {
  const { id } = useParams();
  // console.log(id);

  const navigate = useNavigate();
  const user = useContext(AppState);
  // console.log(user);
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function getAllQuestions() {
      try {
        const { data } = await instance.get("/questions/all-questions");
        setQuestions(data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getAllQuestions();
  }, []);
  // console.log(questions.questions);

  // search questions
  const filteredQuestions = questions?.questions?.filter((question) =>
    question.title?.toLowerCase().includes(query.toLowerCase()),
  );
  // console.log(filteredQuestions);

  return (
    <section className={classes.container}>
      <div className={classes.inner_container}>
        <div className={classes.ask_question}>
          <Link to="/askquestion">
            <button>Ask Question</button>
          </Link>
          <p>Wellcome: {user?.user}</p>
        </div>
        <div>
          <div className={classes.search_container}>
            <span className={classes.search_label}>Search Questions</span>
            <input
              className={classes.search_input}
              type="text"
              placeholder="Type to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {query.length > 0 ? (
            filteredQuestions?.length > 0 ? (
              <div className={classes.results_container}>
                {filteredQuestions.map((question, i) => {
                  const title = question.title;
                  const id = question.questionid;
                  return (
                    /* Moved the unique key to the Link tag to avoid React warnings */
                    <Link
                      to={`/question/${id}`}
                      key={id || i}
                      className={classes.question_link}
                    >
                      <div className={classes.questions}>
                        <p>{title}</p>
                        <IoIosArrowForward size={"30px"} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className={classes.no_results}>
                No result found: "{query}"
              </div>
            )
          ) : (
            ""
          )}
        </div>
        <h2>Questions</h2>
        <div>
          {questions?.questions?.map((question, i) => {
            const title = question.title;
            const userName = question.username;
            return (
              <Link to={`/question/${question.questionid}`}>
                {" "}
                <div key={i} className={classes.questions}>
                  <div className={classes.question_user}>
                    <FaUserCircle size={"80px"} />
                    <p>{userName}</p>
                  </div>
                  <p>{title}</p> <IoIosArrowForward size={"30px"} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Home;
