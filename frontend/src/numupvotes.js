//This function is used when the downvote icon is clicked
function downvote(apiUrl, token, id) {
    let url = String(apiUrl) + "/post/vote?id=" + id;
    fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": "Token " + token,
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.status !== 200) {
                alert("error in downvoting");
            }
        })


}

export default downvote;