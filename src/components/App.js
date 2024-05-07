import React, { useState } from "react";
import HomePage from "./Home";
import Settings from "./Settings";
import About from "./About";
import ContactPage from "./Contact";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Footer from "./Footer";

function App() {
  const commands = [
    {
      command: ["Go to * page", "Go to *", "Open * page", "Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState("");
  const pages = ["home", "settings", "about", "contact"];
  const urls = {
    home: "/",
    settings: "/settings",
    "about": "/about",
    contact: "/contact",
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  let redirect = "";

  if (redirectUrl) {
    if (pages.includes(redirectUrl)) {
      redirect = <Redirect to={urls[redirectUrl]} />;
    } else {
      redirect = <p>Could not find page: {redirectUrl}</p>;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div id="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <Route path="/" exact component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={ContactPage} />

        

        {redirect}
      </BrowserRouter>

      <p id="transcript">Transcript: {transcript}</p>

      <button onClick={SpeechRecognition.startListening}>Start</button>

      <Footer />
    </div>
  );
}

export default App;
