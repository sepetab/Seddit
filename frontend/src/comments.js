import timeConverter from "./conv.js"
//gets comments from the post and append it with date and time and the user using a modal.
function showcomments(comments_block, comments) {
    let mod_div = document.createElement("div");
    mod_div.setAttribute("class", "modal");
    let mod_div2 = document.createElement("div");
    mod_div2.setAttribute("class", "modal-content");
    mod_div.appendChild(mod_div2);
    let span = document.createElement("span");
    span.setAttribute("class", "close");
    span.innerText = "X";
    mod_div2.appendChild(span);
    for (let comment of comments) {
        let text = document.createElement("p");
        text.innerText = comment.author + ": " + comment.comment + " @" + timeConverter(comment.published);
        mod_div2.appendChild(text);
    }
    comments_block.appendChild(mod_div)
    mod_div.style.display = "block";
    span.addEventListener("click", () => {
        mod_div.style.display = "none";
    })
    window.onclick = function (event) {
        if (event.target == mod_div) {
            mod_div.style.display = "none";
        }
    }

    //let parent = document.getElementById("upvoteno")


}
export default showcomments;