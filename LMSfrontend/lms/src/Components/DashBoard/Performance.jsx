import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dstyle.css';
import { useNavigate } from 'react-router-dom';

const Performance = () => {
  const [performanceData, setPerfomanceData] = useState([]);
  const [enrolledcourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch enrolled courses
  useEffect(() => {
    async function fetchCourse() {
      try {
        const userId = localStorage.getItem("id");
        const response = await axios.get(`http://localhost:8080/api/learning/${userId}`);
        const fetchedCourse = response.data;
        setEnrolledCourses(fetchedCourse);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCourse();
  }, []);

  // Fetch performance data
  useEffect(() => {
    const userId = localStorage.getItem("id");
    fetch(`http://localhost:8080/api/assessments/perfomance/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setPerfomanceData(data);
      });
  }, []);

  // Navigate to certificate page
  function certifiedUser(id) {
    navigate(`/certificate/${id}`);
  }

  return (
    <div className="performance-container mt-5">
      <div className="mb-5 d-flex justify-content-center">
        <div className="w-75">
          <h2 className="text-primary mb-4">Courses Enrolled</h2>
          <table className="table table-bordered" style={{ borderColor: '#343a40' }}>
            <thead>
              <tr>
                <th>Courses</th>
              </tr>
            </thead>
            <tbody>
              {enrolledcourses.map((data, index) => (
                <tr key={index}>
                  <td>{data.course_name || "Unknown Course"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-primary mb-4">Performance</h2>
        <table className="table table-bordered" style={{ borderColor: '#343a40' }}>
          <thead>
            <tr>
              <th>Courses</th>
              <th>Progress</th>
              <th>Marks</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((data, index) => (
              <tr key={index}>
                <td>{data.course?.course_name || "Unknown Course"}</td>
                <td className={data.marks !== 0 ? 'text-success' : 'text-warning'}>
                  {data.marks !== 0 ? 'Completed' : 'Pending'}
                </td>
                <td>{data.marks}</td>
                <td className={data.marks !== 0 ? 'text-success' : 'text-muted'}>
                  {data.marks !== 0 && data.course?.id ? (
                    <button className="btn btn-success" onClick={() => certifiedUser(data.course.id)}>
                      Download Certificate
                    </button>
                  ) : (
                    'Not Available'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Performance;
