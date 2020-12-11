import upvotelist from "./uplist.js";
import showcomments from "./comments.js";
import upvote from "./upvote.js";
import downvote from "./downvote.js";
import timeConverter from "./conv.js"
import newpost from "./post.js"
//This function updates feed for user logged in.
function feed(apiUrl, token, page) {
  //get user info
  fetch(String(apiUrl) + "/user/", {
    method: "GET",
    headers: {
      "Authorization": "Token " + token,
      "Content-Type": "application/json"
    }
  })
    .then(info => info.json())
    .then(info => {
      //get user feed
      fetch(String(apiUrl) + "/user/feed?p=" + page + "&n=10", {
        method: "GET",
        headers: {
          "Authorization": "Token " + token,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(response => {
          //BUILDING PAGE -------------------------------------------------------------------------
          let ul2 = Array.from(document.querySelectorAll('[data-id-feed]'))[0];
          let children = Array.from(document.querySelectorAll('[data-id-post]'));
          for (let item of children) {
            ul2.removeChild(item);
          }
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
            div3.setAttribute("id", "feed")
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
            upvote_block.setAttribute("id", "upvoteno")
            div2.appendChild(upvote_block)
            let tagdown = document.createElement("img")
            tagdown.src = "./src/downvote.jpeg"
            tagdown.setAttribute("class", "up-size")
            div2.appendChild(tagdown);
            if (post.image !== null && post.image !== "") {
              let img = document.createElement("img");
              img.src = "data:image/jpeg;base64" + ", " + post.image;
              img.alt = "loading";
              img.setAttribute("class", "image-size");
              div3.appendChild(img);
            }
            let para2 = document.createElement("p");
            para2.setAttribute("class", "post-author");
            para2.setAttribute("data-id-author", "");
            para2.innerText = "posted by " + post.meta.author + " /s/" + post.meta.subseddit +
              " with " + post.comments.length + " comments @ " + timeConverter(post.meta.published);
            div3.appendChild(para2);
            let para3 = document.createElement("p")
            para3.setAttribute("class", "post-author");
            para3.innerText = "username: " + info.username + " email: " + info.email + " Name: " + info.name + " posts: " +
              info.posts.length + " following: " + info.following.length + " followers: " + info.followed_num;
            div3.appendChild(para3)
            let comment_button = document.createElement("button")
            comment_button.innerText = "show comments";
            div3.appendChild(comment_button);
            //PAGE BUILD ENDED -----------------------------------------------------------------------------------------------
            //upvote list
            comment_button.addEventListener("click", () => {
              showcomments(div3, post.comments)
            })
            upvote_block.addEventListener("click", () => {
              upvotelist(apiUrl, token, div3, post.meta.upvotes)
            })
            //upvote
            tag.addEventListener("click", () => {
              upvote(apiUrl, token, post.id);
            })
            //downvote
            tagdown.addEventListener("click", () => {
              downvote(apiUrl, token, post.id)
            })

            ul2.appendChild(list);
          }
          //button for posting
          let body = document.getElementById("root")
          let postbut = document.getElementById("postbut");
          postbut.addEventListener("click", () => {
            newpost(apiUrl, token, body);
          })

          //prev page
          let prev = document.createElement("button")
          prev.innerText = "PREV PAGE"
          body.appendChild(prev)
          if (page !== 0) {
            prev.addEventListener("click", () => {
              children = Array.from(document.querySelectorAll('[data-id-post]'));
              for (let item of children) {
                ul2.removeChild(item);
              }
              body.removeChild(prev)
              body.removeChild(next)
              feed(apiUrl, token, page - 10);
            })
          }


          //next page
          let next = document.createElement("button")
          next.innerText = "NEXT PAGE"
          body.appendChild(next)
          next.addEventListener("click", () => {
            let check = 0;
            children = Array.from(document.querySelectorAll('[data-id-post]'));
            for (let item of children) {
              ul2.removeChild(item);
              check = 1;
            }

            if (check === 1) {
              body.removeChild(next)
              body.removeChild(prev)
              feed(apiUrl, token, page + 10);
            }
          })

        });
    })



}

export default feed;