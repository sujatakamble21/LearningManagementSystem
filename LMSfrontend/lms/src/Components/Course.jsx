import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { Progress, Modal } from "antd";
import Feedback from "./Feedback";

const Course = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [duration, setDuration] = useState(null);
  const [played, setPlayed] = useState(0);
  const [changePlayed, setChangePlayed] = useState(0);
  const [userId] = useState(localStorage.getItem("id"));

  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];
  const playerRef = useRef(null);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
        setCourse(response.data);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  const handleDuration = () => {
    const dur = playerRef.current.getDuration();
    setDuration(dur);
    if (dur !== 0) {
      fetch("http://localhost:8080/api/progress/update-duration", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId, duration: dur }),
      });
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/progress/${userId}/${courseId}`)
      .then((res) => res.json())
      .then((data) => setPlayed(data))
      .catch((err) => console.error("Progress fetch error:", err));
  }, [userId, courseId]);
  

  useEffect(() => {
    async function updateProgress() {
      if (courseId && userId) {
        try {
          const response = await fetch("http://localhost:8080/api/progress/update-progress", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, courseId, playedTime: played, duration }),
          });
          if (response.ok) {
            setPlayed(changePlayed < played ? played : changePlayed);
          }
        } catch (error) {
          console.error("Error updating progress:", error);
        }
      }
    }
    updateProgress();
  }, [changePlayed]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
if (error) return <div className="text-center mt-4 text-danger">Something went wrong!</div>;
if (!course) return <div className="text-center mt-4 text-warning">Course not found!</div>;

  return (
    <div className="container-fluid p-0 m-0" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="p-3 bg-dark text-white text-center">
        <h3>The Complete {course.course_name} Course - 2025</h3>
      </div>

      <div className="row no-gutters p-4">
        <div className="col-lg-7 mb-4">
          <ReactPlayer
            ref={playerRef}
            url={course.y_link}
            controls
            width="100%"
            height="450px"
            onProgress={(progress) => {
              if (changePlayed + 10 <= progress.playedSeconds) {
                setChangePlayed(progress.playedSeconds);
              }
            }}
            onDuration={handleDuration}
            style={{
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.52)",
              padding: "8px",
              backgroundColor: "#d3d3d3",
              borderRadius: "10px",
            }}
          />
        </div>

        <div className="col-lg-5">
          <div className="p-4 bg-white shadow rounded h-100">
            <h5 className="text-primary">🎓 Course Format</h5>
            <p>
              This is a self-paced <strong>online course</strong> with video lectures, exercises, and quizzes.
              Complete it at your own pace within the <strong>8-week</strong> access period.
            </p>

            <h5 className="text-primary">📌 Prerequisites</h5>
            <p>No programming experience required, but basic computer literacy is helpful.</p>

            <h5 className="text-primary">👤 Who Should Take This</h5>
            <ul>
              <li>Beginners in programming</li>
              <li>Anyone interested in {course.course_name}</li>
              <li>Students preparing for CS courses</li>
            </ul>

            <h5 className="text-primary">🧪 Quiz</h5>
            <p>Test your understanding after completing the course.</p>

            <h5 className="text-success">💸 Free Course</h5>
            <p>No payment needed to access full content.</p>

            {Math.ceil((played / duration) * 100) >= 98 ? (
              <button className="btn btn-success mt-2" onClick={() => navigate(`/assessment/${course.course_id}`)}>
                Take Quiz
              </button>
            ) : (
              <button className="btn btn-secondary mt-2" onClick={showModal} disabled>
                Take Quiz (Complete 100% to unlock)
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-fluid px-4">
  <div className="row mb-4">
    <div className="col-12">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">📝 Course Description</h5>
          <p className="card-text">{course.description}</p>
          <p className="card-text">
            Learn everything about <strong>{course.course_name}</strong>, including hands-on practice and solid fundamentals.
          </p>
          <p className="card-text"><strong>Instructor:</strong> {course.instructor}</p>
          <p className="card-text"><strong>Content Type:</strong> Video</p>
          <button className="btn btn-outline-dark mt-2" onClick={() => navigate("/learnings")}>
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  </div>

  <div className="row g-4 mb-4">
    <div className="col-md-6">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">📊 Progress</h5>
          <Progress
            percent={Math.ceil((played / duration) * 100)}
            status="active"
            strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
          />
        </div>
      </div>
    </div>

    <div className="col-md-6">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">📈 Report</h5>
          <p className="card-text">You’ve completed <strong>{Math.ceil((played / duration) * 100)}%</strong> of this course.</p>
        </div>
      </div>
    </div>
  </div>

  <div className="row mb-4">
    <div className="col-12 d-flex justify-content-center">
      <button className="btn btn-primary" onClick={() => navigate(`/discussion/${courseId}`)}>
        💬 Discussion
      </button>
    </div>
  </div>
  </div>

<Feedback courseid={courseId} />
</div>
    
  );
};

export default Course;
