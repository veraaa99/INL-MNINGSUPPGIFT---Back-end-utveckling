// I denna inlämningsuppgift ska ni bygga upp en backend liknande den e-handels webbplats som ni gjorde i JavaScript-2 kursen, med hjälp av Node.js och ramverket Express.

// Den här uppgiften är utformad så att du ska kunna ha både frontend och backend på din github för att visa dina kunskaper.
// Däremot så är det INTE ett krav att koppla ihop dessa för uppgiftens skull. Jag vill bara ha eran backend kod inlämnad för rättning

// Databas struktur:
// Produkterna i din databas kan föreställa det du själv vill att dom ska, men alla produkter bör minst ha följande fält:

// name
// price
// description
// category
// images

// Krav för godkänt:

// NoSQL: Ditt API ska kopplas mot en NoSQL databas tex. MongoDB.
// JSON svar: Alla svar från databasen ska skickas till användaren i form av JSON.
// Lista produkter: Man ska kunna hämta alla produkter som en lista från databasen genom att göra en GET
// Enskild produkt: Man ska kunna hämta en enskild produkt från databasen med en GET och att man skickar med id på produkten som en parameter.
// Lägga till produkt: Man ska kunna lägga till en produkt på databasen med en POST
// Uppdatera produkt: Man ska kunna uppdatera en produkt på databasen med PUT eller PATCH
// Ta bort produkt: Man ska kunna ta bort en produkt från databasen med DELETE
// Meddelanden: Ni ska skapa en separat endpoint där användaren kan skicka ett meddelande med en POST. Där ska ni validera att fälten `name`, `email` & `message` har skickats med. Returnera en status 200 om fälten är korrekt skickade, annars en status 400. Meddelanden behöver inte sparas i databasen.

import express from 'express'
import path from 'path'
import url from 'url'
import router from './routes/products.route.js'
import { errorHandler, notFound } from '../middleware/error.middleware.mjs'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
// const __dirname = path.resolve();

app.use(express.json())

app.use('/api/products', router)
// app.use(express.static(path.join(__dirname, '../view')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view', 'index.html'))
})

app.use(notFound) // NotFound
app.use(errorHandler) // ErrorHandler

export default app