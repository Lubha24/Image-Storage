"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = require("puppeteer");
//import mysql from 'mysql2/promise';
//import fs from 'fs';
//import path from 'path';
var mysql = require("mysql2/promise");
var fs = require("fs");
var path = require("path");
// Function to launch Puppeteer and log into WhatsApp Web
var scrapeWhatsAppImages = function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, groupName, chat, i, images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer_1.default.launch({ headless: false })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                // Go to WhatsApp Web
                return [4 /*yield*/, page.goto('https://web.whatsapp.com/')];
            case 3:
                // Go to WhatsApp Web
                _a.sent();
                // Wait for the user to scan the QR code
                console.log('Please scan the QR code to log in to WhatsApp Web.');
                return [4 /*yield*/, page.waitForSelector('._1XkO3')];
            case 4:
                _a.sent(); // Adjust the selector for the WhatsApp chat container
                groupName = 'Loop Gang';
                return [4 /*yield*/, page.waitForSelector("span[title=\"".concat(groupName, "\"]"))];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.$("span[title=\"".concat(groupName, "\"]"))];
            case 6:
                chat = _a.sent();
                if (!chat) return [3 /*break*/, 8];
                return [4 /*yield*/, chat.click()];
            case 7:
                _a.sent();
                return [3 /*break*/, 10];
            case 8:
                console.log('Group not found!');
                return [4 /*yield*/, browser.close()];
            case 9:
                _a.sent();
                return [2 /*return*/];
            case 10:
                i = 0;
                _a.label = 11;
            case 11:
                if (!(i < 5)) return [3 /*break*/, 14];
                return [4 /*yield*/, page.evaluate(function () { return window.scrollBy(0, -window.innerHeight); })];
            case 12:
                _a.sent();
                _a.label = 13;
            case 13:
                i++;
                return [3 /*break*/, 11];
            case 14: return [4 /*yield*/, page.evaluate(function () {
                    var imgElements = Array.from(document.querySelectorAll('img'));
                    return imgElements.map(function (img) { return img.src; });
                })];
            case 15:
                images = _a.sent();
                console.log('Images found:', images);
                // Save images locally
                images.forEach(function (imageUrl, index) { return __awaiter(void 0, void 0, void 0, function () {
                    var viewSource, _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, page.goto(imageUrl)];
                            case 1:
                                viewSource = _d.sent();
                                _b = (_a = fs).writeFile;
                                _c = [path.join(__dirname, "image".concat(index, ".jpg"))];
                                return [4 /*yield*/, viewSource.buffer()];
                            case 2:
                                _b.apply(_a, _c.concat([_d.sent(), function (err) {
                                        if (err) {
                                            console.error('Error saving image:', err);
                                        }
                                        else {
                                            console.log("Image ".concat(index, " saved."));
                                        }
                                    }]));
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, browser.close()];
            case 16:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
scrapeWhatsAppImages().catch(console.error);
// MySQL Connection setup
var saveImageToDatabase = function (imagePath, filename) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, imageData, query;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mysql.createConnection({
                    host: 'bookings.cgljbyit9mzi.us-east-1.rds.amazonaws.com',
                    user: 'admin',
                    password: 'dkwni#8Almcd!',
                    database: 'Drivers_B',
                })];
            case 1:
                connection = _a.sent();
                imageData = fs.readFileSync(imagePath);
                query = 'INSERT INTO whatsapp_images (image, filename) VALUES (?, ?)';
                return [4 /*yield*/, connection.execute(query, [imageData, filename])];
            case 2:
                _a.sent();
                console.log("".concat(filename, " saved to database."));
                return [4 /*yield*/, connection.end()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// Call the function when images are saved
var images = ['image0.jpg', 'image1.jpg']; // Array of image paths
images.forEach(function (img) { return saveImageToDatabase("./".concat(img), img).catch(console.error); });
setInterval(function () {
    scrapeWhatsAppImages();
}, 3600000); // Run every hour
