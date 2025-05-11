# API Subtitle Processor - Setup and Test Guide

This document provides instructions on how to set up, run, and test the Subtitles XML Processing API. The API is designed to receive XML subtitle files, process them, and allow retrieval of the processed data. It's built with Node.js, Express, and TypeScript, following Clean Architecture principles.

## Project Setup

Follow these steps to get the project running on your local machine.

### 1. Prerequisites

- Node.js (version 18.x or later recommended)
- npm (comes убий Node.js) or yarn
- Git

### 2. Clone the Repository

Clone this repository to your local machine:

```bash
git clone <your-repository-url>
cd <repository-folder-name>
```

_(Replace `<your-repository-url>` with the actual URL of your Git repository and `<repository-folder-name>` with the name of the directory created by cloning.)_

### 3. Install Dependencies

Navigate to the project's root directory (if you're not already there) and install the necessary npm packages:

```bash
npm install
```

_(If you prefer yarn, use `yarn install`)_

### 4. Prepare Example Subtitle Files

Ensure you have the example XML subtitle files in the root directory of the project. If not, create them:

- **`subtitles_pl.xml`**:

  ```xml
  <subtitles video_id="film_abc_123" lang="pl">
    <cue start_time="00:00:01.500" end_time="00:00:03.200">
      <text>To jest pierwszy napis.</text>
    </cue>
    <cue start_time="00:00:04.000" end_time="00:00:06.800">
      <text>A to jest drugi.</text>
    </cue>
  </subtitles>
  ```

- **`subtitles_en.xml`**:
  ```xml
  <subtitles video_id="film_abc_123" lang="en">
    <cue start_time="00:00:01.500" end_time="00:00:03.200">
      <text>This is the first subtitle.</text>
    </cue>
    <cue start_time="00:00:04.000" end_time="00:00:06.800">
      <text>And this is the second one.</text>
    </cue>
  </subtitles>
  ```

### 5. Run the Application (Development Mode)

To start the API server in development mode (which will automatically restart on file changes), run:

```bash
npm run dev
```

The server should start, typically on `http://localhost:3000`. You will see a confirmation message in your console.

## API Testing Steps

Once the API server is running (after completing the "Project Setup" steps), you can test its functionality using `curl` or a similar tool. Execute the following commands in a new terminal window.

### 1. Upload Polish Subtitles

This command sends the content of `subtitles_pl.xml` to the API. The API will process these subtitles and store them (in memory for this version) associated with `video_id="film_abc_123"` and `lang="pl"`.

```bash
curl -X POST \
  -H "Content-Type: application/xml" \
  --data-binary "@subtitles_pl.xml" \
  http://localhost:3000/api/subtitles
```

_You should receive a JSON response confirming the operation, and see a log message on the server console indicating the data was stored._

### 2. Upload English Subtitles

This command sends the content of `subtitles_en.xml` to the API, storing them for `video_id="film_abc_123"` and `lang="en"`.

```bash
curl -X POST \
  -H "Content-Type: application/xml" \
  --data-binary "@subtitles_en.xml" \
  http://localhost:3000/api/subtitles
```

_You should receive a JSON response confirming the operation, and see a log message on the server console._

### 3. Retrieve Polish Subtitles

This command requests the subtitles for `video_id="film_abc_123"` in Polish (`lang="pl"`).

```bash
curl "http://localhost:3000/api/subtitles?videoId=film_abc_123&lang=pl"
```

_You should receive a JSON response containing the processed Polish subtitles that were uploaded in step 1._

### 4. Retrieve English Subtitles

This command requests the subtitles for `video_id="film_abc_123"` in English (`lang="en"`).

```bash
curl "http://localhost:3000/api/subtitles?videoId=film_abc_123&lang=en"
```

_You should receive a JSON response containing the processed English subtitles that were uploaded in step 2._
