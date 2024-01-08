import React from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";
const Landing = () => {
  useEffect(() => {
    document.title = "TrelloClone";
  }, []);

  return (
    <div>
      <section className="landing">
        <nav className="top">
          <h2>TrelloClone</h2>
          <div>
            <Button color="inherit" href="/login">
              Login
            </Button>
            <Button variant="contained" href="/register">
              Sign Up
            </Button>
          </div>
        </nav>
        <div className="landing-inner">
          <h1>TrelloClone</h1>
          <p>
            Just like <a href="https://trello.com/">Trello</a>, but made by just
            one guy!
          </p>
          <div className="buttons">
            <Button variant="outlined" color="inherit" href="/register">
              Sign Up
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
