const Telegraf = require('telegraf');
const app = new Telegraf('928852165:AAH0EauTDjAiNtR4rLQbG0pA1OWSIEGtJCw');

app.hears('hi', ctx => {
 return ctx.reply('Hey!');
});

app.startPolling();

const axios = require('axios');

// handle the reaction everytime user sends a text message
app.on('text', ctx => {

const subreddit = ctx.message.text;

// GET the data from Reddit API
 axios.get(`https://gismeteo.ru/r/${subreddit}/top.json?limit=10`)
 .then(res => {

// data recieved from Reddit
 const data = res.data.data;

// if subbreddit does not exist
 if (data.children.length < 1) 
 return ctx.reply('Не найдено');

// send the first top post link to the user
 const link = `https://gismeteo.ru/${data.children[0].data.permalink}`;
 return ctx.reply(link);
 })

// if there's any error in request
 .catch(err => console.log(err));
});