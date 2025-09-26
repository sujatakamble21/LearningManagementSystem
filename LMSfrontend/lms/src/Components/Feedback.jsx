import React, { useEffect, useState } from "react";

const Feedback = (props) => {
  const [feedback, setFeedback] = useState("");

  const courseId = props.courseid;

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/feedbacks/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        const firstThreeFeedbacks = data.slice(0, 3);
        setFeedbacks(firstThreeFeedbacks);
      })
      .catch((error) => console.error("Error:", error));
  }, [courseId]);

  const sendFeedback = () => {
    if (feedback === "" && !courseId) {
      alert("Please enter feedback to submit");
    } else {
      fetch("http://localhost:8080/api/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: feedback, course_id: courseId }),
      })
        .then((response) => {
          console.log(response);
          setFeedback("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {}, [feedback]);

  return (
    <div className="feedback-main">
      <div className="get-input mb-4 bg-light">
  <label htmlFor="email" className="form-label text-dark">Your Feedback</label>
  <input
    type="text"
    className="form-control border-info mb-2"
    onChange={(e) => setFeedback(e.target.value)}
    value={feedback}
    placeholder="Enter your feedback here..."
  />
  <button
    onClick={sendFeedback}
    className="btn btn-dark"
  >
    Submit
  </button>
</div>

      <div className="feedback-list bg-light">
      <h4 className="text-dark">Recent Feedbacks:</h4>
        <ul>
          {feedbacks.map((item, index) => (
            <li key={index}>{item.comment}</li>
          ))}
        </ul>
      </div>
      <br />
    </div>
  );
};

export default Feedback;
