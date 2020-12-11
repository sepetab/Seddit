/**
 * Written by Aravind Venkateswaran z5208102.
 *
 * Updated 2019.
 */

// import your own scripts here.
import timeConverter from "./conv.js"

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with
// different datasets.
//IMPORTS---------------------
import login from "./login.js";
import sgnup from "./registration.js";
/////////---------------------
function initApp(apiUrl) {
  //BUILDS BODY --------------------------------------------------------------------------
  let body = document.getElementById("root");
  let header = document.createElement("header");
  header.setAttribute("class", "banner");
  header.id = "nav";
  body.appendChild(header);
  let h1 = document.createElement("h1");
  h1.id = "logo";
  h1.setAttribute("class", "flex-center");
  h1.innerText = "Seddit";
  header.appendChild(h1);
  let ul = document.createElement("ul");
  ul.setAttribute("class", "nav");
  ul.setAttribute("id", "mainhead")
  header.appendChild(ul);
  let li1 = document.createElement("li");
  let li2 = document.createElement("li");
  let li3 = document.createElement("li");
  li1.setAttribute("class", "nav-item");
  li2.setAttribute("class", "nav-item");
  li3.setAttribute("class", "nav-item");
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  let input = document.createElement("Input");
  input.setAttribute("id", "search");
  input.placeholder = "Search Seddit";
  input.type = "search";
  input.setAttribute("data-id-search", "");
  li1.appendChild(input);
  let b1 = document.createElement("button");
  let b2 = document.createElement("button");
  b1.setAttribute("class", "button button-primary");
  b1.setAttribute("data-id-login", "");
  b1.innerText = "Log-in";
  b2.setAttribute("class", "button button-secondary");
  b2.setAttribute("data-id-signup", "");
  b2.innerText = "Sign-up";
  li2.appendChild(b1);
  li3.appendChild(b2);
  let main = document.createElement("main");
  main.setAttribute("role", "main");
  body.appendChild(main);
  let ul2 = document.createElement("ul");
  ul2.setAttribute("id", "feed");
  ul2.setAttribute("data-id-feed", "");
  main.appendChild(ul2);
  let dive = document.createElement("div");
  dive.setAttribute("class", "feed-header");
  ul2.appendChild(dive);
  let h3a = document.createElement("h3");
  h3a.setAttribute("class", "feed-title alt-text");
  h3a.innerText = "Popular posts";
  dive.appendChild(h3a);
  let b3a = document.createElement("button");
  b3a.setAttribute("class", "button button-secondary");
  b3a.innerText = "Post";
  b3a.setAttribute("id", "postbut")
  dive.appendChild(b3a);
  let footer = document.createElement("footer");
  let para = document.createElement("p");
  para.innerText = "Seddit!";
  footer.appendChild(para);
  body.appendChild(footer);
  //BODY BUILD ENDED ----------------------------------------------------
  if (!localStorage.getItem("token")) {
    //getting public posts

    fetch(String(apiUrl) + "/post/public")
      .then(response => response.json())
      .then(response => {
        for (let post of response.posts) {
          let list = document.createElement("li");
          list.setAttribute("class", "post");
          list.setAttribute("data-id-post", "");
          let div2 = document.createElement("div");
          div2.setAttribute("class", "vote");
          div2.setAttribute("data-id-upvotes", "");
          list.appendChild(div2);
          let div3 = document.createElement("div");
          list.appendChild(div3);
          div3.setAttribute("class", "content");
          let h4 = document.createElement("h4");
          h4.setAttribute("class", "post-title alt-text");
          h4.setAttribute("data-id-title", "");
          h4.innerText = post.title;
          div3.appendChild(h4);
          let textpara = document.createElement("p")
          let text = "";
          text = post.text;
          textpara.innerText = text;
          div3.appendChild(textpara)
          let tag = document.createElement("img")
          tag.src = "./src/upvote.jpeg"
          tag.setAttribute("class", "up-size")
          div2.appendChild(tag)
          let upvote_block = document.createElement("p");
          upvote_block.innerText = post.meta.upvotes.length;
          div2.appendChild(upvote_block)
          let tagdown = document.createElement("img")
          tagdown.src = "./src/downvote.jpeg"
          tagdown.setAttribute("class", "up-size")
          div2.appendChild(tagdown);
          if (post.image !== null && post.image !== "") {
            let img = document.createElement("img");
            img.src = "data:image/jpeg;base64" + ", " + post.image;
            img.alt = "loading...";
            img.setAttribute("class", "image-size");
            div3.appendChild(img);
          }
          let para2 = document.createElement("p");
          para2.setAttribute("class", "post-author");
          para2.setAttribute("data-id-author", "");
          para2.innerText = "posted by " + post.meta.author + " /s/" + post.meta.subseddit +
            " with " + post.comments.length + " comments @ " + timeConverter(post.meta.published);
          div3.appendChild(para2);
          ul2.appendChild(list);
        }
      });
  }

  login(apiUrl);
  sgnup(apiUrl);
}
export default initApp;
