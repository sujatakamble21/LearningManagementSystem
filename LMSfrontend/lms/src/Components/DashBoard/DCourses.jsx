import React, { useState, useEffect } from "react";
import "./dstyle.css";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isDeleted, setDeleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [cid, setCid] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setDeleted(false);
  }, [isDeleted]);

  const showModal = (courseId) => {
    setCid(courseId);
    setOpenModal(true);
  };

  const handleOk = () => {
    deleteCourse(cid);
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  function deleteCourse(courseId) {
    axios
      .delete(`http://localhost:8080/api/courses/${courseId}`, {
        data: { courseId: courseId },
      })
      .then((response) => {
        console.log("Delete successful:", response.data);
        setDeleted(true);
        setCid(-1);
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  }

  function editCourse(course_id) {
    navigate(`/editCourse/${course_id}`);
  }

  function addquestions(course_id) {
    navigate(`/addquestions/${course_id}`);
  }

  return (
    <>
      <SideBar current={"courses"} />
      <section id="content">
        <Navbar />
        <main className="t">
          <div className="table-data mt-2">
            <div className="order">
              <div id="course" className="todo">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="text-white">Courses</h3>
                  <button
                    onClick={() => navigate("/addcourse")}
                    className="btn btn-primary rounded-3"
                  >
                    Add Course <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <ul className="list-group">
                  {courses.map((course) => (
                    <li
                      key={course.course_id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>{course.course_name}</span>
                      <div className="d-flex">
                        <button
                          onClick={() => showModal(course.course_id)}
                          className="btn btn-danger btn-sm mx-2"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>

                        <button
                          onClick={() => editCourse(course.course_id)}
                          className="btn btn-warning btn-sm mx-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button
                          onClick={() => addquestions(course.course_id)}
                          className="btn btn-info btn-sm"
                        >
                          Test
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </section>

      {/* Delete Confirmation Modal */}
      <Modal
        id="poppup"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ padding: "10px" }}
      >
        <h4>Are you sure you want to delete this course?</h4>
      </Modal>
    </>
  );
}

export default Courses;
