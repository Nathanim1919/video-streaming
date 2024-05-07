import { Link } from "react-router-dom";
import TechImage from '/image/bg.jpg';

export const Account = () => {
    return (
        <div>
            <div className="header">
                <div className="coverImage">
                    <img src={TechImage} alt="cover-image"/>
                </div>
                <div className="profileInfo">
                    <div className="profileImage">
                        <img src={TechImage} alt="profile-pic"/>
                    </div>
                    <div className="info">
                        <h3>John Doe</h3>
                        <p>Full Stack Developer</p>
                    </div>
                </div>
            </div>
        </div>
    );
}