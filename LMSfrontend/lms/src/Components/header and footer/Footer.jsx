import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../css/style.css'

function Footer(){
  return(
  <section id='footer'>
     <footer>
     <div className="footer-col">
  <h3>Master Courses</h3>
  <li>Advanced React & Redux</li>
  <li>Full Stack Development</li>
  <li>AI & Deep Learning</li>
  <li>DevOps & Cloud Deployment</li>
</div>

<div className="footer-col">
  <h3>Intermediate Courses</h3>
  <li>React JS</li>
  <li>Node.js & Express</li>
  <li>Data Structures & Algorithms</li>
  <li>Database Design with SQL</li>
</div>

<div className="footer-col">
  <h3>Beginner Courses</h3>
  <li>HTML, CSS, JavaScript</li>
  <li>Python Basics</li>
  <li>Introduction to Machine Learning</li>
  <li>Project Management Basics</li>
</div>
<div className="copyright">
  <p>© 2025  LMS. All rights reserved.</p>
  <div className="pro-links">
    <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faFacebookF} className="i" />
    </a>
    <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faInstagram} className="i" />
    </a>
    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faLinkedinIn} className="i" />
    </a>
  </div>
        </div>
        </footer>
      </section>
  )
}
export default Footer;