require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const connection = require('./db')
const { dblClick } = require('@testing-library/user-event/dist/click')

app.route('/signup').post(function(req, res) {
  connection.query(
    "INSERT INTO users VALUES (?,?)", [req.body.first_name, req.body.password],
    function(error, results) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
});

//user will input a song and we will return info about the song
//console.log('start next');
app.route('/songinfo').post(function(req, res) {
  console.log('inside');
  console.log('user inputed song', [req.body.song]);
  connection.query(
    "SELECT DISTINCT artists, danceability FROM songs_M_dataset WHERE name = ?", [req.body.song],
    function(error, results) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
});

app.route('/login').post(function(req, res) {
  connection.query(
    "SELECT * FROM users WHERE username = ? AND password = ?", [req.body.first_name, req.body.password],
    function(error, results) {
      //if ('[]') console.log("wrong");
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
});

// app.route('/getFriends').get(function(_, res) {
//   connection.query(
//     "SELECT * FROM users WHERE username = ? AND password = ?",
//     function(error, results) {
//       if ('[]') console.log("wrong");
//       if (error) throw error;
//       console.log(results);
//       res.json(results);
//     }
//   );
// })

app.route('/addFriend').post(function(req, res) {
  connection.query(
    "INSERT INTO friends (name, phone_number) VALUES (?,?)", [req.body.first_name, req.body.phone_number],
    function(error, results) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
})

// app.route('/topArtists').post(function(req, res) {
//   connection.query(
//     "INSERT INTO friends (name, phone_number) VALUES (?,?)",
//     function(error, results) {
//       if (error) throw error;
//       console.log(results);
//       res.json(results);
//     }
//   );
// })

app.route('/topArtists').get(function(_, res) {
  connection.query(
    "SELECT artists.name, SUM(streams) FROM Final_Proj_Schema.artists INNER JOIN Final_Proj_Schema.our_songs ON artists.artistId = our_songs.artist_Id INNER JOIN Final_Proj_Schema.spotify_charts ON  our_songs.trackId = spotify_charts.trackId GROUP BY artists.name, our_songs.artist_Id ORDER BY SUM(streams) DESC, artists.name ASC",
    function(error, results) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
});

app.route('/danceability').get(function(req, res) {
  connection.query(
    "SELECT artists.name, ROUND(SUM(our_songs.danceability)) AS danceability FROM Final_Proj_Schema.artists INNER JOIN Final_Proj_Schema.our_songs ON artists.artistId = our_songs.artist_Id GROUP BY artists.name ORDER BY 2 DESC LIMIT 25",
    function(error, results) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
});

app.route('/deleteFriend').post(function(req, res) {
  connection.query(
    "DELETE FROM Final_Proj_Schema.friends WHERE name = ?", [req.body.first_name],
    function(error, results) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
})

app.route('/updatePhoneNumber').post(function(req, res) {
  connection.query(
    "UPDATE Final_Proj_Schema.friends SET phone_number = ? WHERE name = ?", [req.body.phone_number, req.body.first_name],
    function(error, results) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
})

app.route('/getSongPlaylist').post(function(req, res) {
  const { duration, vibe, eventType } = req.body
  let thresholds = [0, 0, 0, 0] //lowest and highest danceability and loudness
  let queryProcedure = "" //stored procedure called in the database
  const new_duration = duration * 3600 * 1000; // changing hours to ms

  switch (vibe) { // switch case for the vibes
    //array is lower and higher bound of danceability
    case "uchill":
      thresholds = [0, 0.2, 0, 0.2]
      break
    case "chill":
      thresholds = [0.2, 0.4, 0.2, 0.4]
      break
    case "r":
      thresholds = [0.4, 0.6, 0.4, 0.6]
      break
    case "hype":
      thresholds = [0.6, 0.8, 0.6, 0.8]
      break
    case "uhype":
      thresholds = [0.8, 1.0, 0.8, 1.0]
      break
    default:
      break
  }

  switch (eventType) {
    case "christmas":
      queryProcedure = "SelectEventChris"
      break
    case "vday":
      queryProcedure = "SelectEventValentine"
      break
    case "bday":
      queryProcedure = "SelectEventBirthday"
      break
    case "spookyszn":
      queryProcedure = "SelectEventHalloween"
      break
    case "karaoke":
      queryProcedure = "SelectEventKaraoke"
      break
    case "pregame":
      queryProcedure = "SelectEventPregame"
      break
    case "pool":
      queryProcedure = "SelectEventPoolParty"
      break
    case "kickback":
      queryProcedure = "SelectEventKickback"
      break
    default:
      break
  }

  connection.query(
    `CALL ${queryProcedure} (?, ?, ?, ?, ?)`, [...thresholds, new_duration],
    function(error, results) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
})

app.get('/', (req, res) => {
  console.log(connection.config.user)
  res.send("Hello world")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

/*
Stored Procedure stuff:
CREATE PROCEDURE SelectEventChris
AS
SELECT * FROM Songs_M
WHERE (name LIKE "%Christmas%" OR name LIKE "%snow%"
OR name LIKE "%presents%" OR artist LIKE "Michael Bublé") AND (vibe stuff) AND (duration stuff)
GO

CREATE PROCEDURE SelectEventValentines
AS
SELECT * FROM Songs_M
WHERE name LIKE "%love%" OR name LIKE "%red%"
OR name LIKE "%heart%" OR name LIKE ""
GO
*/