//This function is used when the upvote icon is clicked
function upvote(apiUrl, token, id) {
    let url = String(apiUrl) + "/post/vote?id=" + id;
    fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": "Token " + token,
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.status !== 200) {
                alert("error in upvoting");
            }
        })



}

export default upvote;