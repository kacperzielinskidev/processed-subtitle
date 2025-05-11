# API Subtitle Processor - Quick Test Guide

This guide provides simple steps to test the API's functionality for uploading and retrieving subtitles using `curl`.

## Prerequisites

- The API server must be running (e.g., on `http://localhost:3000`).
- You need two XML subtitle files in your current directory:

  - `subtitles_pl.xml`: Contains Polish subtitles for `video_id="film_abc_123"`.
  - `subtitles_en.xml`: Contains English subtitles for `video_id="film_abc_123"`.

  **Example `subtitles_pl.xml`:**

  ```xml
  <subtitles video_id="film_abc_123" lang="pl">
    <cue start_time="00:00:01.500" end_time="00:00:03.200">
      <text>To jest pierwszy napis.</text>
    </cue>
    <!-- Add more cues as needed -->
  </subtitles>
  ```

  **Example `subtitles_en.xml`:**

  ```xml
  <subtitles video_id="film_abc_123" lang="en">
    <cue start_time="00:00:01.500" end_time="00:00:03.200">
      <text>This is the first subtitle.</text>
    </cue>
    <!-- Add more cues as needed -->
  </subtitles>
  ```

## Testing Steps

Execute the following `curl` commands in your terminal.

### 1. Upload Polish Subtitles

This command sends the content of `subtitles_pl.xml` to the API. The API will process these subtitles and store them (e.g., in memory) associated with `video_id="film_abc_123"` and `lang="pl"`.

```bash
curl -X POST \
  -H "Content-Type: application/xml" \
  --data-binary "@subtitles_pl.xml" \
  http://localhost:3000/api/subtitles
```

_You should receive a JSON response confirming the operation._

### 2. Upload English Subtitles

This command sends the content of `subtitles_en.xml` to the API. The API will process these subtitles and store them associated with `video_id="film_abc_123"` and `lang="en"`.

```bash
curl -X POST \
  -H "Content-Type: application/xml" \
  --data-binary "@subtitles_en.xml" \
  http://localhost:3000/api/subtitles
```

_You should receive a JSON response confirming the operation._

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

---

If all steps are successful, it confirms that the API can:

- Accept XML subtitle data for different languages under the same video ID.
- Store this data.
- Retrieve and serve the correct subtitles based on the `videoId` and `lang` query parameters.
# processed-subtitle
