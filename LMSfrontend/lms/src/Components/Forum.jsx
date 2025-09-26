import { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

function Forum() {
  const taskRef = useRef("");
  const [message, setMessage] = useState([]);
  const [name, setName] = useState(localStorage.getItem("name"));
  const [course, setCourse] = useState();
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];

  const [formData, setFormData] = useState({
    name: name,
    course_id: courseId,
    content: ''
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/discussions/${courseId}`)
      .then((res) => res.json())
      .then((data) => setMessage(data));
    fetch(`http://localhost:8080/api/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => setCourse(data));
  }, [courseId]);

  const addTask = () => {
    if (taskRef.current && taskRef.current.value.trim() !== "") {
      const newMessage = taskRef.current.value.trim();
      setFormData({ ...formData, content: newMessage });

      fetch('http://localhost:8080/api/discussions/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(() => {
        taskRef.current.value = "";
        setMessage([...message, formData]);
        setFormData({ ...formData, content: "" });
      });
    } else {
      alert("Enter a Message");
    }
  };

  return (
    <div className="container py-5" style={{ minHeight: '100vh', backgroundColor: '#fefefe' }}>
      <h2 className="text-center mb-4 text-primary">Discussion for {course?.course_name}</h2>

      <textarea
        className="form-control mb-3"
        rows="4"
        ref={taskRef}
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        placeholder="Type your message..."
      />

      <div className="text-end mb-4">
        <button className="btn btn-primary px-4" onClick={addTask}>Send</button>
      </div>

      {message.length > 0 && (
        message.map((value, key) =>
          value.content.trim() !== "" && (
            <div className="p-3 mb-2 border rounded bg-light" key={key}>
              <strong className="text-info me-2">{value.uName}</strong>
              <span className="text-dark">{value.content}</span>
            </div>
          )
        )
      )}
    </div>
  );
}

export default Forum;
