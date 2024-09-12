# QA Labeler

QA Labeler is a crowdsourcing-based video voting and survey website, where users compare and vote on videos. The website was developed for a funded research project. The platform enables users to view two videos side-by-side and provide feedback or select a preferred video based on a particular question or task. The videos are hosted on Google Drive, and the site integrates with Google Drive API, Google Sheets API, and MongoDB for data management. QA Labeler is fully responsive and can be used on both mobile and desktop devices.

## Features

- **Video Comparison & Voting**: Users are shown two videos side-by-side and are asked to compare and vote on them based on a specific question over a set of attributes.
- **Google Drive Integration**: Videos are hosted on Google Drive, with access and viewing powered by Google Drive API.
- **Google Sheets Integration**: The user info and responses are stored in Google Sheets for easy access and analytics.
- **MongoDB Database**: User activity, voting data, and metadata are stored in a cloud-based MongoDB database for real-time storage and retrieval.
- **Mobile & Desktop Support**: The website is designed to be responsive and works on both mobile and desktop devices, providing a seamless experience regardless of platform.

## Workflow

1. **Home Page**: Users are presented with an index page that introduces them to the voting process.
2. **Video Voting Interface**:
   - Two videos are displayed side-by-side.
   - Users are asked to compare the videos and vote based on a specific question or task.
3. **Submit Votes**: Once the user selects their preferred video, they submit their vote over different criterias. Votes are recorded in MongoDB for future reference.
4. **Next Video Pair**: After submitting a vote, the user is shown the next pair of videos to compare.
5. **Surveys**: The platform can also be adapted for survey-style comparisons, where users provide feedback on videos for research or product testing purposes.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python (Flask)
- **Server**: Heroku
- **APIs**:
  - Google Drive API: To load and stream videos from Google Drive.
  - Google Sheets API: To log and store survey responses and votes.
- **Database**: MongoDB (Cloud-based)

## Important Information

- This website is developed for a funded research project and is subject to updates and intellectual property rights. For more details contact us via email (GitHub profile). 
- Please refer to the LICENSE file for information regarding website licensing.
- The server-side code and API integration details can be made available upon request. Please contact us via email (GitHub profile) for more information.
