const express = require("express")
const axios = require("axios")
const app = express();  
const ytsr = require('ytsr');
const ytdl = require('ytdl-core')
app.use(express.static('public'))

app.get("/search/:q",(req,res)=>{
  const q = req.params.q;
  
  axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyD4LkDVhw9RnkgprtkWLcc6fBi5u6LO5hg&type=video&q="+q)
  .then((axios)=>{return axios.data.items.map((value=>{return {videoid:value.id.videoId,title:value.snippet.title}}))}).then((data)=>{
    const videoID = data[0].videoid;
    console.log(videoID);
ytdl.getInfo(videoID).then(resp=>{
    res.json(resp.formats);
  })
   
})
})




// Example of filtering the formats to audio only.

//AIzaSyCdMdqblqRy4ObnC7IFI-xTz5rjO9qS0zc
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
})
const PORT = process.env.PORT ||3000;
app.listen(PORT,()=>{console.log("SERVER ON");})