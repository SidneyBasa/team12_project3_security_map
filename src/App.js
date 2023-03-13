import React, { useState } from 'react';
import Header from './components/Header';
import Body from './components/Body';

function App() {
    
    //TODO set default page
    const [currentPage, setCurrentPage] = useState();
    const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="App">
      <h1>{currentPage}</h1>
      <Header handlePageChange={handlePageChange} />
      <Body currentPage={currentPage} />
    </div>
  );
}

export default App;
