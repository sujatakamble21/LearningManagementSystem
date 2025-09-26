import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function Navbar(){
  const navigate = useNavigate();
  const handleLogout = () => {
    
    navigate('/adminlogin'); 
  };
    return(
        <nav>
          <form action="#">
            <div className="form-input">
            </div>
            <button className="btn btn-danger ms-auto" onClick={handleLogout}>
          Logout
        </button>
          </form>
        </nav>
    );
}

export default Navbar;