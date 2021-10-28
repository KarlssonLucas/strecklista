# streck6
Digital management for committee inventory.

## Features
* Individual accounts 
* Make payments to the bank
* Change user password
* Admin managing users page
* Payment and buy history
* Buy items directly from page
* Hash and salts password with bcrypt

## Technicals 
This webapp is written with a pg express backend and react frontend using materials UI components. 
To store data I'm using a psql database that is managed by the pg express API. The page saves the 
loggedIn information in a session so that you don't have to log in until the session is old. The 
webpage we personally use is hosted at heroku with the psql addon. 

## For the future
* Managing users page
* Structure the API and structure the frontend.
* Safer way of storing sessions

Heres how it looks :)

---
