# Back End Development Assignment: eCommerce REST API

## Project description
My final assignment project in the back end development-course at the Front End Developer programme. 

This task was similar to the one I did in the Javascript 2-course, where we were tasked to make an e-shop website. On this website, the user can browse products, place orders, send a message via a form and also register and login to their own account. 
The difference this time was partly that the user can now also add their own products to the website, and partly that the focus was to create our own API that could connect and store data in collections on a database. 
I also added the feature to register and login users, something I didn’t have the time to add in the Javascript 2-assignment.

The project’s main purpose was to let us students learn about how to create our own REST API using React and Express, to practice our back end skills.
Since we had to use a NoSQL database, I used MongoDB. I created a new cluster, and used Mongoose to easily create structures for various collections, and store these in the cluster. The collections I made were products, users and orders.
I also used an extension to Visual Studio Code called Postman, which I used in order to test various API calls. This made the testing process much more smooth.
To make the front end part, I used Javascript, React, Vite, Context API and Tailwind just like in the Javascript 2 project.

Since it was my first time doing back end coding, I did take some time to understand how everything worked. After doing some practicing and testing, it started to become much easier however. Making an API with various endpoints was really fun, and it was nice to create and have your own database & cluster to keep track of all products, orders and users on the e-shop website.

For the assignment I chose to primarily focus on the back end part (making the API, connect to a database, creating a cluster and collections) of the assignment. Creating the front end part was also encouraged, but not a requirement. I re-used a lot of code and assets from the Javascript 2-assignment, but changed some parts in order for it to work with my own API.
It was a bit of a challenge to make the back end and front end codes work together, but I learned a lot and I’m very happy with the final result.

## Installation
To launch the website, first make sure that you have NodeJs installed. 

Clone the repository: `https://github.com/veraaa99/INL-MNINGSUPPGIFT---Back-end-utveckling.git` or download it as a zip-file and unpack it.<br/>

Create an `.env` file and add the neccesairy environment variables to the document. Or add them to the `.env-example` file found in the `backend` folder, and change the `"dev": "nodemon --env-file=.env src/server.js"`
script to `"dev": "nodemon --env-file=.env.example src/server.js"` in the `package.json` file in the `backend` folder.

Open the project in eg. your development environment and open up two new terminals.<br/>In the first terminal, navigate to the `backend` folder by typing `cd backend` and then run the `npm run dev` command.<br/>In the second terminal, navigate to the `view` folder via `cd view`. Finally, run `npm run dev` in the second terminal too, and launch the `localhost`-link in your desired browser.

## Usage & features
Use the nav bar on top to navigate between the site’s different pages.

On the Home screen and the Products screen, you’re able to browse different products, remove items and update them.
At the bottom of the Products page, you can fill in and submit a form to create your very own product. This will be saved to the database and shown on the Products page.

To send a message, go to the Send Message-page via the nav bar. Fill in your name, email and your message in the displayed form, press the **Submit**-button, and you will be greeted with a message confirming that your message has been successfully submitted. 

Navigate to Login to log in to the website. If you don’t have an account yet, you can press the Register link from the login page to navigate to the register page. 

After logging in, you’re able to add products to your shopping cart. Press the Cart-button in the nav bar to see your added items. You can also add more, remove one or remove all items from your cart. Press the checkout button in the shopping cart to navigate to the Checkout page. 

From the Checkout page, you’re able to review your oder, add or remove items one last time, and then place your order. 

## Credits
The default placeholder images used in this project are taken from Unsplash.com, and do not belong to me.

I want to give a huge thanks to my teacher who has taught me so much related to starting out in back end development. I feel like I’ve learned a lot just through this course, and his lectures and coding tips have helped me a lot! :)
