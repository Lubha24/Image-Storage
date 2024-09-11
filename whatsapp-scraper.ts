import puppeteer from 'puppeteer';
//import mysql from 'mysql2/promise';
//import fs from 'fs';
//import path from 'path';
import * as mysql from 'mysql2/promise';
import * as fs from 'fs';
import * as path from 'path';


// Function to launch Puppeteer and log into WhatsApp Web
const scrapeWhatsAppImages = async () => {
 const browser = await puppeteer.launch({ headless: false });
 const page = await browser.newPage();

 // Go to WhatsApp Web
 await page.goto('https://web.whatsapp.com/');

 // Wait for the user to scan the QR code
 console.log('Please scan the QR code to log in to WhatsApp Web.');
 await page.waitForSelector('._1XkO3'); // Adjust the selector for the WhatsApp chat container

 // Select the specific group by name
 const groupName = 'Loop Gang'; // Replace with your group name
 await page.waitForSelector(`span[title="${groupName}"]`);
 const chat = await page.$(`span[title="${groupName}"]`);
 if (chat) {
 await chat.click();
 } else {
 console.log('Group not found!');
 await browser.close();
 return;
 }

 // Scroll through the chat to load images
 for (let i = 0; i < 5; i++) {
 await page.evaluate(() => window.scrollBy(0, -window.innerHeight));
 //await page.waitForTimeout(1000); // Wait for images to load
 }

 // Scrape images from the chat
 const images = await page.evaluate(() => {
 const imgElements = Array.from(document.querySelectorAll('img'));
 return imgElements.map((img) => img.src);
 });

 console.log('Images found:', images);

 // Save images locally
 images.forEach(async (imageUrl, index) => {
 const viewSource = await page.goto(imageUrl);
 fs.writeFile(path.join(__dirname, `image${index}.jpg`), await viewSource!.buffer(), (err) => {
 if (err) {
 console.error('Error saving image:', err);
 } else {
 console.log(`Image ${index} saved.`);
 }
 });
 });

 await browser.close();
};

scrapeWhatsAppImages().catch(console.error);


// MySQL Connection setup
const saveImageToDatabase = async (imagePath: string, filename: string) => {
 const connection = await mysql.createConnection({
 host: 'bookings.cgljbyit9mzi.us-east-1.rds.amazonaws.com',
 user: 'admin',
 password: 'dkwni#8Almcd!',
 database: 'Drivers_B',
 });

 const imageData = fs.readFileSync(imagePath);

 // Insert image data into MySQL
 const query = 'INSERT INTO whatsapp_images (image, filename) VALUES (?, ?)';
 await connection.execute(query, [imageData, filename]);

 console.log(`${filename} saved to database.`);
 await connection.end();
};

// Call the function when images are saved
const images = ['image0.jpg', 'image1.jpg']; // Array of image paths
images.forEach((img) => saveImageToDatabase(`./${img}`, img).catch(console.error));

setInterval(() => {
    scrapeWhatsAppImages();
   }, 3600000); // Run every hour