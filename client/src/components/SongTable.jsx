import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiRoute = '/stemday/api';

function SongTable() {
  const [songs, setSongs] = useState([]);

  function getRegisteredSongs(setSongs) {
    const apiUrl = `${apiRoute}/registeredSongs`
      
    console.log('Using API URL:', apiUrl);
    
    axios.get(apiUrl)
      .then((response) => {
        console.log('API Response:', response);
        if (Array.isArray(response.data)) {
          setSongs(response.data);
        } else {
          console.error('API returned non-array data:', response.data);
          setSongs([]);
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
        // Try to provide more detailed error information
        if (error.response) {
          console.error('Error status:', error.response.status);
          console.error('Error data:', error.response.data);
        }
        setSongs([]);
      });
  }

  useEffect(() => {
      getRegisteredSongs(setSongs);
    }, []);

  return (
    <div className="container">
      <header>
        {songs.length === 0 ? (
          <div className="alert alert-info mt-3">
            No songs available. Please check your server connection.
          </div>
        ) : (
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
        )}
      </header>
    </div>
  );
}

export default SongTable;