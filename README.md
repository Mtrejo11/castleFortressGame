# Castle Fortress Game

## 💡 Inspiration
The idea is to be able to explore a new level of immersion within a decision-making game using the power of the player's voice. The way the idea has been developed is with a police mystery story that little by little shows that the secrets of the past always come to light.

The story takes inspiration from the police thrillers of television but adding more elements such as science fiction, mad scientists, etc.

## 🤔 What it does
The game us the voice of the user 🧏‍♂️ , as an input, to move over the story of the game, and depends of what the user says, the course of the history change.

## 💻 Tech Stack
Frontend: React Native
Backend: Cloud Functions , NodeJS, Google Cloud Speech API
DB: Firebase Firestore
Auth: Firebase Auth
NPL Engine: Wit.ai

## 🧙‍♂️ How we built it
First step was coming out with an idea of a story out of the conventional decision games. Wit.ai provides the necessary tools to achive this goal so we developed the API using Node JS to manage sound data requests, handle all natural process language operations from wit.ai, looking for the point in the story, from our DB, and finally converting the text to speech, with Google Cloud. For the process of building a cross platform application we used React Native so the whole environment was written using JavaScript and the integration was less complicated. Next steps were finding out how to record audio from the physical device and send this data to our API so it could be processed by wit.ai, and receive a response depending from the API which data comes processed as text to speech, so the reponse from the API after the voice message is processed can be reproduced by our application and players are able to listen to it.
