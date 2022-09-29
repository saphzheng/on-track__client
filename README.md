
![Logo](https://i.imgur.com/UMPCbgp.jpeg)


# onTrack Fitness 

An online workout aid that aims to help users reach fitness goals by providing
an easy-to-use platform to structure/log workouts and visualize progress. An alternative
to physical workout journals which are easy to lose and tedious to review.
onTrack Fitness focuses on convenience through automatic data visualization
and multiple device support.

https://ontrack-fitness.herokuapp.com/


## Features

- Login to personal account
- Live data visualization based on user input
- Extensive list of exercises sourced from *ExerciseDB*
- User data saved to server
- Fully responsive on all devices


## Tech Stack

**Client:** React, TailwindCSS, Auth0

**Server:** Node, Express


## Run Locally

#### Server Side

Clone the project

```bash
  git clone git@github.com:saphzheng/on-track__server.git
```

Navigate to the project directory or open in code editor

```bash
  cd on-track__server
```

Create an .env file and set PORT according to .env.sample file

```bash
  echo "PORT=<port to use>" > .env
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

#### Client Side

Clone the project

```bash
  git clone git@github.com:saphzheng/on-track__client.git
```

Navigate to the project directory or open in code editor

```bash
  cd on-track__client
```

Create an .env file and set REACT_APP_API_URL according to .env.sample file

```bash
  echo "REACT_APP_API_URL=<server url>" > .env
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Reference

*Authorization token required for all API calls

#### Get all exercises

```http
  GET /exercise/items
```

#### Get exercises relating to a body part

```http
  GET /exercise/${bodyPart}
```

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `bodyPart`| `string` | **Required**. Body part name to filter by |

#### Get exercises containing search keyword

```http
  GET /exercise/search/${q}
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `q`       | `string` | **Required**. Search query to filter by |

#### Get all exercise logs for a user

```http
  GET /exerciseLog/?user=${user}
```

| Parameter    | Type     | Description                           |
| :----------- | :------- | :------------------------------------ |
| `user`       | `string` | **Required**. User email to filter by |

#### Get exercise logs for a specific date and user

```http
  GET /exerciseLog/${date}/?user=${user}
```

| Parameter    | Type     | Description                             |
| :----------- | :------- | :-------------------------------------- |
| `date`       | `string` | **Required**. Date of logs to filter by |
| `user`       | `string` | **Required**. User email to filter by   |

#### Add exercise log for a specific date and user

```http
  POST /exerciseLog
```

Requires body containing new exercise log

#### Get exercise logs for a specific data and user

```http
  DELETE /exerciseLog/${id}
```

| Parameter  | Type     | Description                                |
| :--------- | :------- | :----------------------------------------- |
| `id`       | `string` | **Required**. Id of exercise log to delete |


## Screenshots

#### Landing Page 

![Landing Page ](https://i.imgur.com/fniP23Q.png)

#### Dashboard 

![Dashboard ](https://i.imgur.com/GgqPt2L.png)

#### Explore Exercises

![Explore Exercises](https://i.imgur.com/2KIdB4o.png)

![Exercise List](https://i.imgur.com/1fQQ42f.png)

#### My Workouts

![My Workouts](https://i.imgur.com/yjKf1Wj.png)

![My Workouts Overiew](https://i.imgur.com/M6WsgBy.png)

#### Search Results

![Search Results](https://i.imgur.com/NYdM5AH.png)

#### Mobile Version

![Mobile Version Search](https://www.simpleimageresizer.com/_uploads/photos/649d2676/onTrack_landing_page_-_Imgur_1_50.png) 

![Mobile Version Sidebar](https://www.simpleimageresizer.com/_uploads/photos/649d2676/onTrack_landing_page_-_Imgur_50.png)


## Roadmap

- Dashboard widget customization
- Option to create preset workouts to pre-populate exercises
- Add edit workout feature
- Allow users to log exercises to previous dates
- Social feature -> ability to send/receive workout plans


## Lessons Learned

- Create detailed plan/mockups before starting to code
- Don't get caught up on minor features before stabilizing core functionality
- Ask for feedback early in the process
- Be mindful of time restraints to avoid becoming over ambitious 

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)