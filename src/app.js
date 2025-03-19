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
// OK

// JSON svar: Alla svar från databasen ska skickas till användaren i form av JSON.
// OK

// Lista produkter: Man ska kunna hämta alla produkter som en lista från databasen genom att göra en GET
// OK

// Enskild produkt: Man ska kunna hämta en enskild produkt från databasen med en GET och att man skickar med id på produkten som en parameter.
// OK

// Lägga till produkt: Man ska kunna lägga till en produkt på databasen med en POST
// OK

// Uppdatera produkt: Man ska kunna uppdatera en produkt på databasen med PUT eller PATCH
// OK

// Ta bort produkt: Man ska kunna ta bort en produkt från databasen med DELETE
// OK

// Meddelanden: Ni ska skapa en separat endpoint där användaren kan skicka ett meddelande med en POST. Där ska ni validera att fälten `name`, `email` & `message` har skickats med. 
// Returnera en status 200 om fälten är korrekt skickade, annars en status 400. Meddelanden behöver inte sparas i databasen.
// OK

// VÄL GODKÄNT:

// Registrera användare: 
// Användaren ska kunna registrera sig med POST och få tillbaka en status 201 
// och en jsonwebtoken innehållande relevant information.
// OK

// Kryptera lösenord: 
// När en användare skapas så ska email och lösenord sparas i databasen. 
// Detta lösenord ska krypteras och får INTE sparas i klartext.
// OK

// Logga in användare: 
// Användaren ska kunna logga in med POST och få tillbaka en status 200 
// och en jsonwebtoken innehållande relevant information.
// OK

// Order hantering: 
// Om användaren är inloggad, ska användaren kunna spara en order i databasen. 
// Varje order ska innehålla en array -> `products` där varje objekt innehåller `productId` och `quantity`. 
// 

// Order-User relation: 
// När ordern sparas, använd en Bearer token för att spara användarens id på ordern.

// Order historik: 
// Användaren ska kunna hämta alla sina tidigare lagda ordrar 
// genom att göra en GET och skicka med en Bearer token.

// Order-Product relation: 
// När användaren hämtar sina tidigare lagda ordrar (via en GET-förfrågan till orderhistorik-endpointen), 
// ska varje order innehålla en array -> `products`, där varje objekt innehåller all information om varje produkt i ordern. 
// För att uppnå detta, skapa en relation mellan `productId` i ordern och den faktiska produkten i databasen. 
// Använd en teknik som kallas "populering" (populating) för att inkludera den detaljerade produktinformationen i varje order. 
// Säkerställ att denna information skickas korrekt som en del av API-svaret för att ge användaren fullständig information 
// om varje produkt i deras tidigare lagda ordrar.

import express from 'express'
import path from 'path'

import productRoutes from './routes/product.route.js'
import messageRoutes from './routes/message.route.js'
import userRoutes from './routes/user.route.js'
import orderRoutes from './routes/order.route.js'

import { errorHandler, notFound } from './middleware/error.middleware.mjs'

const app = express()
const __dirname = path.resolve();

app.use(express.json({ extended: false }));

app.use('/api/products', productRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(express.static(path.join(__dirname, './view')));

app.use(notFound) // NotFound
app.use(errorHandler) // ErrorHandler

export default app