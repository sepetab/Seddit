//gets list of users who upvoted
function upvotelist(apiUrl, token, upvote_block, userids) {
    //creats a modal to show users
    let mod_div = document.createElement("div");
    mod_div.setAttribute("class", "modal");
    let mod_div2 = document.createElement("div");
    mod_div2.setAttribute("class", "modal-content");
    mod_div.appendChild(mod_div2);
    let span = document.createElement("span");
    span.setAttribute("class", "close");
    span.innerText = "X";
    mod_div2.appendChild(span);
    for (let user of userids) {

        fetch(String(apiUrl) + "/user/?id=" + user, {
            method: "GET",
            headers: {
                "Authorization": "Token " + token,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                let text = document.createElement("p");
                text.innerText = response.username;
                mod_div2.appendChild(text);
            })
    }
    upvote_block.appendChild(mod_div)
    mod_div.style.display = "block";
    span.addEventListener("click", () => {
        mod_div.style.display = "none";
    })
    window.onclick = function (event) {
        if (event.target == mod_div) {
            mod_div.style.display = "none";
        }
    }
}
export default upvotelist;