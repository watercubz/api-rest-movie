# movies-api-js

This is an api developed in Node.js that It allows you to obtain endpoints which you can use for your personal or professional projects, which you need to carry out is totally opensource, simple, and easy to configure in your project, this api responds to an endpoint with a JSON that contains information about all the movies.

## Getting Started

To run this HTTP server locally, follow these steps:

1. Make sure you have Node.js installed on your system.

2. Clone this repository: `git clone <URL_OF_YOUR_REPO>`

3. Navigate to the repository directory: `cd <REPO_DIRECTORY>`

4. Install the required dependencies: `npm install`

5. Run the server: `npm run dev`

6. Open your web browser and go to `http://localhost:4000/movies` to see the "movies endopoint" response.

## Code Explanation

This code allows you to obtain various edpoints which allow you to obtain, create, update, delete, obtain by id, various json with movies This project is in version v0.01 Any contribution is accepted for the improvement of the API

### Prerequisites

- Node.js

### Running the Server

To start the server, use the following command: `node npm run dev`

### Server Configuration

- Port: 4000

### Endpoint

- URL: `http://localhost:4000/movies`
- Method: GET

- URL: `http://localhost:4000/movies/dcdd0fad-a94c-4810-8acc-5f108d3b18c3`
- Method: GET:ID

- URL:
`http://localhost:4000/movies
`
`{
    "title": "The Little",
    "year": 2009,
    "director": "blanck jons",
    "duration": 120,
    "poster": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FEtoe9LMG7mc%2Foar2.jpg%3Fsqp%3D-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC%26rs%3DAOn4CLCvoDGO_VENt_nxY6Rp-G3N-NvFVg&tbnid=kFfvDjbsZ_0vSM&vet=12ahUKEwj5-NHZke2CAxVSGmIAHRgaBhQQMygCegQIARBU..i&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fc%2Fmidulive%2Fshorts&docid=lK_7Ak_GDk8vJM&w=405&h=720&q=foto%20midulive&ved=2ahUKEwj5-NHZke2CAxVSGmIAHRgaBhQQMygCegQIARBU",
    "genre": [
        "Drama"
    ]
}`
- Method: POST

- URL:
`http://localhost:4000/movies/6a360a18-c645-4b47-9a7b-2a71babbf3e0`
- Method: DELETE

- URL: http://localhost:4000/movies/8fb17ae1-bdfe-45e5-a871-4772d7e526b8
`
{
    "year": 2020,
    "title": "the confession",
    "director": "Francisco cosco"
}
`
- Method: PATCH

## Contributing

If you want to contribute to this project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
