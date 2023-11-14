import home1Image from "../../../Assets/Images/Home1Image.jpg";
import home2Image from "../../../Assets/Images/Home2Image.jpg";
import home3Image from "../../../Assets/Images/Home3Image.jpg";
import home4Image from "../../../Assets/Images/Home4Image.jpg";
import home5Image from "../../../Assets/Images/Home5Image.jpg";
import home6Image from "../../../Assets/Images/Home6Image.jpg";
import "./Home.css";

function Home(): JSX.Element {
  return (
    <div className="Home">
      <div className="images-left">
        <img src={home1Image} alt="Home Image 1" />
        <img src={home2Image} alt="Home Image 2" />
        <img src={home3Image} alt="Home Image 3" />
      </div>
      <div className="content">
        <h2 className="welcome-heading">Welcome To Lets Fly</h2>
        <p className="welcome-paragraph">
          Welcome to 'Lets Fly,' your premier destination for seamless vacation planning and
          booking. Dive into a world of unparalleled travel experiences as we offer a
          user-friendly platform that allows you to explore, plan, and book your dream vacations
          with ease. Whether you're an adventure seeker, beach enthusiast, or cultural explorer,
          'Lets Fly' provides a diverse range of destinations and accommodations to suit every
          traveler's taste. Embark on a journey of convenience and excitement as you discover the
          world's wonders through our personalized and hassle-free booking services.
        </p>
      </div>
      <div className="images-right">
        <img src={home4Image} alt="Home Image 4" />
        <img src={home5Image} alt="Home Image 5" />
        <img src={home6Image} alt="Home Image 6" />
      </div>
    </div>
  );
}

export default Home;
