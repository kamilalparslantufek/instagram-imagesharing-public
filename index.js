const { default: axios } = require("axios");
const ax = require("axios");
const { Console } = require("console");
const events = require("events");
const em = new events.EventEmitter();
const fs = require("fs");
const express = require("express");
const app = express();

let authfile;
let datafile;
let businessId;
let instagramPageId;
em.on("start", function () {
  try {
    //fire starting event with file names
    em.emit("readFiles", { data: "data.json", auth: "auth.json" });
  } catch (err) {
    console.log(err);
  }
});

em.on("readFiles", (data) => {
  datafile = JSON.parse(fs.readFileSync(data.data).toString());
  authfile = JSON.parse(fs.readFileSync(data.auth).toString());
  if (checkEmpty(authfile)) throw "data file could not be found or empty.";
  if (checkEmpty(datafile)) throw "data file could not be found or empty.";
  else em.emit("startBot");
});
// em.on("getId", () => {
//   ax.get(
//     //you may need to change this URL, for public use, as i am using it as developer project, me endpoint actually points my own account id
//     //for public use you should use an auth system with login to get their url and change me bit with their id
//     `https://graph.facebook.com/v11.0/me?fields=id%2Cname%2Cbusinesses&access_token=${authfile.LLT}`
//   ).then((res) => {
//     console.log(res.data.businesses.data);
//     for (let val of res.data.businesses.data) {
//       if (val.name === authfile.account_name) businessId = val.id;
//     }
//     if(checkEmpty(businessId)) throw "business id null";
//     ax.get(`https://graph.facebook.com/v11.0/${businessId}?fields=instagram_business_accounts&access_token=${authfile.LLT}`)
//     .then((res)=> {
//       instagramPageId = res.data.instagram_business_accounts.data[0].id;
//       em.emit("startBot");
//     })
//   });
// });
em.on("startBot", () => {
  post();
});

em.on("postImage", (containerId) => {
  ax.post(
    `https://graph.facebook.com/v11.0/${authfile.ig_id}/media_publish?creation_id=${containerId}&access_token=${authfile.LLT}`,
    ""
  )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(process.env.PORT || 5000, () => {
  em.emit("start");
});

function post() {
  let imgData = datafile[Math.floor(Math.random() * datafile.length)];
  //this bit will get an update tags and captions will be moved to data or auth files
  let tags =
    "%0A%20%23funny%20%23reddit%20%23kodlama%20%23caps%20%23miim%20%23mizah%20%23karamizah%20%23darkmizah%20%23programming%20%23bot%20%23botsofinstagram%20%23imagebot%20%23shitpostbot%20%23shitpost%20%234chan%20%23meme%20%23memes%20%23funny%20%23dankmemes%20%23memesdaily%20%23funnymemes%20%23lol%20%23humor%20%23dank%20%23like%20%23memepage%20%23instagram%20%23lmao%20%23dailymemes%20%23memestagram";
  let caption =
    "Bu+rastgele+yap%C4%B1lm%C4%B1%C5%9F+bir+bot+g%C3%B6nderisidir%2C+kendi+g%C3%B6rsel+ve+miimlerinizin+payla%C5%9F%C4%B1lmas%C4%B1n%C4%B1+istiyorsan%C4%B1z+sayfaya+mesaj+olarak+g%C3%B6nderebilirsiniz.";
  console.log(imgData);
  //create container
  ax.post(
    `https://graph.facebook.com/v11.0/${authfile.ig_id}/media?image_url=${imgData.url}&caption=%0ATitle:${imgData.title}%0A${caption}${tags}&access_token=${authfile.LLT}`,
    ""
  )
    .then((res) => {
      //check container if its ready to post, post it & set timer for next post
      //might update this bit, set fixed times or something like that
      console.log(res.data);
      checkContainer(res.data.id);
      setTimeout(post, 60000 * 90);
    })
    .catch((err) => {
      console.log(err);
      setTimeout(post, 60000 * 90);
    });
}

function checkContainer(containerId) {
  ax.get(
    `https://graph.facebook.com/v11.0/${containerId}?fields=status_code&access_token=${authfile.LLT}`
  ).then((res) => {
    console.log(res.data);
    //publish post on instagram account after container is ready
    if (res.data.status_code === "FINISHED") em.emit("postImage", containerId);
    else setTimeout(checkContainer, 3000, containerId);
  });
}
//i got mad and made this lmao
function checkEmpty(val) {
  if (
    val === "" ||
    val === undefined ||
    val === "NaN" ||
    val === NaN ||
    val === null
  )
    return true;
  return false;
}
