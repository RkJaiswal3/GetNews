import './App.css';
import React, { useState } from 'react';
import NavBar from './cmp/NavBar';
import News from './cmp/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [progress, setProgress] = useState(0);

  const apiKey = process.env.REACT_APP_API_KEY;
  const pageSize = 9;

  return (
    <Router>
      <div>
        <NavBar />
        <LoadingBar
          color='#f11946'
          progress={progress}
          height={3}
        />
        <Routes>
          <Route
            exact
            path="/sports"
            element={<News myApiKEY={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="us" category="sports" />}
          />
          <Route
            exact
            path="/"
            element={<News myApiKEY={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country="us" category="business" />}
          />
          <Route
            exact
            path="/general"
            element={<News myApiKEY={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="us" category="general" />}
          />
          <Route
            exact
            path="/entertainment"
            element={<News myApiKEY={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />}
          />
          <Route
            exact
            path="/science"
            element={<News myApiKEY={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country="us" category="science" />}
          />
          <Route
            exact
            path="/health"
            element={<News myApiKEY={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country="us" category="health" />}
          />
          <Route
            exact
            path="/technology"
            element={<News myApiKEY={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="us" category="technology" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
