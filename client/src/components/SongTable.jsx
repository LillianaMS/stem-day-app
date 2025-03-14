import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function SongTable() {
  const [songs, setSongs] = useState([]);

  function getRegisteredSongs(setSongs) {
    const apiUrl = import.meta.env.PROD 
      ? '/stemday/api/registeredSongs'
      : '/api/registeredSongs';
      
    console.log('Using API URL:', apiUrl);
    
    axios.get(apiUrl)
      .then((response) => {
        console.log('API Response:', response);
        setSongs(response.data);
      })
      .catch((error) => {
        console.error('API Error:', error);
        // Try to provide more detailed error information
        if (error.response) {
          console.error('Error status:', error.response.status);
          console.error('Error data:', error.response.data);
        }
      });
  }

  useEffect(() => {
      getRegisteredSongs(setSongs);
    }, []);

  return (
    <div className="container">
      <header>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>QR Code</th>
              <th>MP3 URL</th>
              <th>Script Name</th>
              {/* <th>Share ID</th> */}
              {/* <th>Share URL</th>
              <th>Timestamp</th>
              <th>Email</th> */}
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr key={index}>
                <td>{song.firstName + " " + song.lastName}</td>
                <td>{song.qrCodeNum}</td>
                <td>{song.mp3Url}</td>
                <td>{song.scriptName}</td>
                {/* <td>{song.shareID}</td> */}
                {/* <td>{song.shareUrl}</td>
                <td>{song.startDate}</td>
                <td>{song.email}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default SongTable;