import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./component/Header";
import Home from "./pages/Home";
import Footer from "./component/Footer";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import AboutUs from "./component/AboutUs";
import Projects from "./component/Projects";
import News from "./component/Blogs";
import Contact from "./component/Contact";
import ClientNews from "./component/ClientNews";
import ClientContent from "./component/ClientContent";
import OurTeam from "./component/OurTeam";
import BlogDetails from "./component/BlogDetails";
import Blogs from "./component/Blogs";
import EventDetails from "./component/EventDetails";
import Events from "./component/Events";
import Casting from "./component/Casting";
import Crew from "./component/Crew";
import Productions from "./component/Productions";
import LoadingScreen from "./component/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
    {loading ? (
      <LoadingScreen setLoading={setLoading} />
    ):(
      <Routes >
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<AboutUs/>} />
        <Route path="projects" element={<Projects />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="contact" element={<Contact/>} />
        <Route path="news/:id" element={<ClientNews/>} />
        <Route path="content/:id" element={<ClientContent/>} />
        <Route path="events" element={<Events/>} />
        <Route path="event/:id" element={<EventDetails/>} />
        <Route path="blogs/:id" element={<BlogDetails/>} />
        <Route path="ourteam" element={<OurTeam/>}/>
        <Route path="casting" element={<Casting/>}/>
        <Route path="crew" element={<Crew/>} />
        <Route path="events" element={<Events/>} />
        <Route path="productions" element={<Productions/>}/>
        
      </Route>
    </Routes>
    )}
    </>
  );
}

export default App;
