const request = require('request');
const fs = require('fs');

// Parameters Setup: receive 2 arguments from CLI
const input = process.argv.slice(2)

if (input.length !== 2) {
  console.log("Please pass 2 arguments: url and file name with address (location/name.ext)");
  console.log("<< Suggestion for location: ./fetcher/fileName.html >>")
  process.exit();
}

const url = input[0];
const path = input[1];


// Chained Async: request and write
request(url, function (error, response, body) {
  // If an error occurs (ex. incorrect url, print error and code)
  if (error) {
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode);
    return
  }
  // Otherwise, write the file
  fs.writeFile(path, body, error => {
    if (error) {
      console.error(error);
      return
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${path}`)
  })}
);
