# Youtube Clone API Documentation

## Models

### User

```md
- username : string, required,
- email : string, required, unique
- password : string, required, length of password minimum 6
- phoneNumber : string, required
- address : string, required
```

### Favorite

```md
- avatarUrl : text
- type : text
- canonicalBaseUrl : text
- channelId : integer
- titleChannel : text
- description : text
- thumbnailUrl : text
- views : integer
- videoId : integer
- titleVideo : text
- UserId : integer
```

## Relationship

### One-to-Many

Relasi antara `User` & `Favorite`

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-login`

Routes below need authentication:

- `GET /favorite`
- `POST /favorite`
- `GET /UserId/:id`
- `DELETE /favorite/:id`
- `PUT /favorite/updateFavorite/:id`

Routes below need authentication & authorization:

- `GET /youtube/trailers`

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

Response (201 - Created)

```json
{
  "username": "string",
  "email": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Email is already used"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Email is invalid"
}
OR
{
  "message": "Password is required"
}
```

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

## 3. POST /google-login

Request:

- body:

```json
{
  "email": "string",
}
```

Response (200 - OK)

```json
{
  "goggle_token": "string"
}
```

## 3. GET /favorite/UserId/:id

Get current user favourites

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "UserId": "integer"
}
```

Response (200 - OK)

```json
[
  {
    "id": 1,
    "avatarUrl": "https://yt3.ggpht.com/ytc/AIf8zZRk7wPdrke93AYdRm7XrsKiBYWM-0RnH_m6s0EHSw=s48-c-k-c0x00ffffff-no-rj",
    "channelId": "UCuPivVjnfNo4mb3Oog_frZg",
    "titleChannel": "A24",
    "description": "RELEASE DATE: April 26, 2024 DIRECTOR: Alex Garland CAST: Kirsten Dunst, Wagner Moura, Stephen McKinley Henderson, and Cailee Spaeny....",
    "thumbnailUrl": "http://https://i.ytimg.com/vi/aDyQxtg0V2w/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDXCAW57VRLXdLVYaNTQgll49hunA",
    "views": "2220991",
    "videoId": "aDyQxtg0V2w",
    "titleVideo": "Civil War | Official Trailer HD | A24",
    "userId": 1,
  },
  {
    "id": 2,
    "avatarUrl  ": "https://yt3.ggpht.com/TkwJQBfOe-sI_sws8ON0ddevuxmbYQ4Ya-n54eLyTu-1BVjBMtbi6kBYv_DsaS8lf-Q1RCjC=s48-c-k-c0x00ffffff-no-rj",
    "channelId": "UCOpcACMWblDls9Z6GERVi1A",
    "titleChannel": "Screen Junkies",
    "description": "After the Honest Trailer for Tim Burton's Charlie and the Chocolate Factory check out the new episode of Fandom IRL in which a real lawyer reacts to Willy Wonka's shenanigans ► https://youtu.be/RWImcm2DnIg....",
    "thumbnailUrl": "https://i.ytimg.com/vi/7nRcMKB2EiY/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDfwHXw0s1IbY6ngzNA-UaOAHbW4g",
    "views": "481776",
    "videoId": "7nRcMKB2EiY",
    "titleVideo": "Honest Trailers | Charlie and the Chocolate Factory",
    "userId": 1,
  }
  ...,
]
```

## 4. POST /favorite

Add new favorite video

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "UserId": "integer"
}
```

Response (200 - Created)

```json
{
  "avatarUrl": "text",
  "type": "text",
  "canonicalBaseUrl": "text",
  "channelId": "integer",
  "titleChannel": "text",
  "description": "text",
  "thumbnailUrl": "text",
  "views": "integer",
  "videoId": "integer",
  "titleVideo": "text"
}
```

## 5. Delete /favorite/:id

- Delete favourite Video

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "message": "Favorite deleted"
}
```

Response (404 - Not Found)

```json
{
  "message": "Data not found"
}
```

## 6. PUT /favorite/updateFavorite/:id

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "id": 1,
  "avatarUrl  ": "https://yt3.ggpht.com/ytc/AIf8zZRk7wPdrke93AYdRm7XrsKiBYWM-0RnH_m6s0EHSw=s48-c-k-c0x00ffffff-no-rj",
  "channelId": "UCuPivVjnfNo4mb3Oog_frZg",
  "titleChannel": "A24",
  "description": "RELEASE DATE: April 26, 2024 DIRECTOR: Alex Garland CAST: Kirsten Dunst, Wagner Moura, Stephen McKinley Henderson, and Cailee Spaeny....",
  "thumbnailUrl": "http://https://i.ytimg.com/vi/aDyQxtg0V2w/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDXCAW57VRLXdLVYaNTQgll49hunA",
  "views": "22209872",
  "videoId": "aDyQxtg0V2w",
  "titleVideo": "Civil War | Official Trailer HD | A24",
  "userId": 1
}
```

Response (200 - OK)

```json
{
  "id": 1,
  "avatarUrl  ": "https://yt3.ggpht.com/ytc/AIf8zZRk7wPdrke93AYdRm7XrsKiBYWM-0RnH_m6s0EHSw=s48-c-k-c0x00ffffff-no-rj",
  "channelId": "UCuPivVjnfNo4mb3Oog_frZg",
  "titleChannel": "A24",
  "description": "RELEASE DATE: April 26, 2024 DIRECTOR: Alex Garland CAST: Kirsten Dunst, Wagner Moura, Stephen McKinley Henderson, and Cailee Spaeny....",
  "thumbnailUrl": "http://https://i.ytimg.com/vi/aDyQxtg0V2w/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDXCAW57VRLXdLVYaNTQgll49hunA",
  "views": "22209872",
  "videoId": "aDyQxtg0V2w",
  "titleVideo": "Civil War | Official Trailer HD | A24",
  "userId": 1
}
```

Response (404 - Not Found)

```json
{
  "message": "Data not found"
}
```

## 7. GET /youtube/details/:id

- headers:

```json
{
  "X-RapidAPI-Key": "<string token>",
  "X-RapidAPI-Host": "<string url>"
}
```

Response (200 - OK)

```json
[
  {
    "avatar  ": "https://yt3.ggpht.com/TkwJQBfOe-sI_sws8ON0ddevuxmbYQ4Ya-n54eLyTu-1BVjBMtbi6kBYv_DsaS8lf-Q1RCjC=s48-c-k-c0x00ffffff-no-rj",
    "channelId": "UCOpcACMWblDls9Z6GERVi1A",
    "subscribers": "200000000000",
    "titleChannel": "Screen Junkies",
    "category": "video",
    "description": "After the Honest Trailer for Tim Burton's Charlie and the Chocolate Factory check out the new episode of Fandom IRL in which a real lawyer reacts to Willy Wonka's shenanigans ► https://youtu.be/RWImcm2DnIg....",
    "thumbnailUrl": "https://i.ytimg.com/vi/7nRcMKB2EiY/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDfwHXw0s1IbY6ngzNA-UaOAHbW4g",
    "videoId": "7nRcMKB2EiY",
    "titleVideo": "Honest Trailers | Charlie and the Chocolate Factory",
    "release": "2016",
    "totalComment": "20000",
    "totalLike": "150000",
    "totalViews": "50000000"
  }
]
```

Response (429 - Bad Request):

```json
{
  "message": "Limitation 3rd party"
}
```

## 8. GET /youtube/video/:id

- headers:

```json
{
  "X-RapidAPI-Key": "<string token>",
  "X-RapidAPI-Host": "<string url>"
}
```

Response (200 - OK)

```json
[
  {
    "avatarUrl  ": "https://yt3.ggpht.com/TkwJQBfOe-sI_sws8ON0ddevuxmbYQ4Ya-n54eLyTu-1BVjBMtbi6kBYv_DsaS8lf-Q1RCjC=s48-c-k-c0x00ffffff-no-rj",
    "type": "video",
    "canonicalBaseUrl": "https://youtube.com/user/dramas",
    "channelId": "UCOpcACMWblDls9Z6GERVi1A",
    "titleChannel": "Screen Junkies",
    "description": "After the Honest Trailer for Tim Burton's Charlie and the Chocolate Factory check out the new episode of Fandom IRL in which a real lawyer reacts to Willy Wonka's shenanigans ► https://youtu.be/RWImcm2DnIg....",
    "thumbnailUrl": "https://i.ytimg.com/vi/7nRcMKB2EiY/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDfwHXw0s1IbY6ngzNA-UaOAHbW4g",
    "views": "481776",
    "videoId": "7nRcMKB2EiY",
    "titleVideo": "Honest Trailers | Charlie and the Chocolate Factory",
    "date": "March, 2016",
  }
  ...
]
```

Response (429 - Bad Request):

```json
{
  "message": "Limitation 3rd party"
}
```

## 9. GET /search/:search

- params:

```json
{
  "search": "search"
}
```

- headers:

```json
{
  "X-RapidAPI-Key": "<string token>",
  "X-RapidAPI-Host": "<string url>"
}
```

Response (200 - OK)

```json
[
  {
    "avatarUrl": "https://yt3.ggpht.com/ebu9ZksIXw0tUWBZd6rtk-It8VGSk8AdfSI_eGR-fl6WGet9LnVPngNQCmjdLJeGXpuylwYInQ=s68-c-k-c0x00ffffff-no-rj",
    "type": "video",
    "canonicalBaseUrl": "/@programmingwithmosh",
    "channelId": "UCWv7vMbMWH4-V0ZXdmDpPBA",
    "titleChannel": "Programming with Mosh",
    "description": "Want to learn more from me? Check out my blog and courses: Courses: https://codewithmosh.com Blog: ...",
    "thumbnailUrl": "https://i.ytimg.com/vi/SqcY0GlETPk/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLChbr7yRBFhR7K-rqbSJIbfKCCnzQ",
    "views": 1672315,
    "videoId": "SqcY0GlETPk",
    "titleVideo": "React Tutorial for Beginners"
  },
  {
    "avatarUrl": "https://yt3.ggpht.com/ytc/AIf8zZTUVa5AeFd3m5-4fdY2hEaKof3Byp8VruZ0f0FNEA=s68-c-k-c0x00ffffff-no-rj",
    "type": "video",
    "canonicalBaseUrl": "/@Fireship",
    "channelId": "UCsBjURrPoezykLs9EqgamOA",
    "titleChannel": "Fireship",
    "description": "#react #webdev #100SecondsOfCode Install the quiz app iOS https://itunes.apple.com/us/app/fireship/id1462592372?mt=8 ...",
    "thumbnailUrl": "https://i.ytimg.com/vi/Tn6-PIqc4UM/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJFW0Yti88CQhc6f9uOl6noNZZag",
    "views": 1126571,
    "videoId": "Tn6-PIqc4UM",
    "titleVideo": "React in 100 Seconds"
  }
]
```

Response (429 - Bad Request):

```json
{
  "message": "Limitation 3rd party"
}
```

## 10. GET /youtube/trailers

- GET trailers video dari 3rd party API

- headers:

```json
{
  "X-RapidAPI-Key": "<string token>",
  "X-RapidAPI-Host": "<string url>"
}
```

Response (200 - OK)

```json
[
  {
    "avatarUrl  ": "https://yt3.ggpht.com/TkwJQBfOe-sI_sws8ON0ddevuxmbYQ4Ya-n54eLyTu-1BVjBMtbi6kBYv_DsaS8lf-Q1RCjC=s48-c-k-c0x00ffffff-no-rj",
    "type": "video",
    "canonicalBaseUrl": "https://youtube.com/user/dramas",
    "channelId": "UCOpcACMWblDls9Z6GERVi1A",
    "titleChannel": "Screen Junkies",
    "description": "After the Honest Trailer for Tim Burton's Charlie and the Chocolate Factory check out the new episode of Fandom IRL in which a real lawyer reacts to Willy Wonka's shenanigans ► https://youtu.be/RWImcm2DnIg....",
    "thumbnailUrl": "https://i.ytimg.com/vi/7nRcMKB2EiY/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDfwHXw0s1IbY6ngzNA-UaOAHbW4g",
    "views": "481776",
    "videoId": "7nRcMKB2EiY",
    "titleVideo": "Honest Trailers | Charlie and the Chocolate Factory"
  },
  ...
]
```

Response (429 - Bad Request):

```json
{
  "message": "Limitation 3rd party"
}
```

## Global Error

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
}
```

Response (403 - Forbidden)

```json
{
  "message": "You are not authorized"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```
