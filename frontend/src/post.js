//Gets triggered when the post button is pressed
function newpost(apiUrl, token, parent) {
    //creats form and modal
    let mod_div = document.createElement("div");
    mod_div.setAttribute("id", "modal")
    mod_div.setAttribute("class", "modal");
    let mod_div2 = document.createElement("div");
    mod_div2.setAttribute("class", "modal-content");
    mod_div.appendChild(mod_div2);
    let span = document.createElement("span");
    span.setAttribute("class", "close");
    span.innerText = "X";
    mod_div2.appendChild(span);
    parent.appendChild(mod_div)
    mod_div.style.display = "block";
    const my_form = document.createElement("form");
    my_form.name = "post-form";
    my_form.method = "POST";
    const Title = document.createElement("Input");
    Title.name = "Title";
    Title.type = "text";
    Title.placeholder = "Title";
    const Text = document.createElement("Input");
    Text.name = "Text";
    Text.placeholder = "Text";
    const subreddit = document.createElement("Input");
    subreddit.name = "subreddit";
    subreddit.type = "text";
    subreddit.placeholder = "subreddit";
    const imageinput = document.createElement("Input")
    imageinput.id = "yo"
    imageinput.name = "image"
    imageinput.setAttribute("type", "file")
    imageinput.setAttribute("accept", "image/*")
    my_form.appendChild(imageinput)
    const postbutton = document.createElement("button")
    postbutton.innerText = "post";
    postbutton.setAttribute("type", "submit");
    my_form.appendChild(Title);
    my_form.appendChild(Text);
    my_form.appendChild(subreddit);
    my_form.appendChild(postbutton)
    my_form.addEventListener("submit", e => {
        e.preventDefault();
        //if image is there
        if (my_form.image.value) {
            var file = imageinput.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                let inputimage = reader.result.replace(/^data:image.+;base64,/, '');

                const input = {
                    title: my_form.Title.value,
                    text: my_form.Text.value,
                    subseddit: my_form.subreddit.value,
                    image: inputimage
                };

                fetch(String(apiUrl) + "/post/", {
                    method: "POST",
                    body: JSON.stringify(input),
                    headers: {
                        "Authorization": "Token " + token,
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => {
                        if (response.status !== 200) {
                            alert(response.status)
                        }
                    })
            }
            reader.readAsDataURL(file);
            //or no image was given
        } else {
            const input = {
                title: my_form.Title.value,
                text: my_form.Text.value,
                subseddit: my_form.subreddit.value
            };

            fetch(String(apiUrl) + "/post/", {
                method: "POST",
                body: JSON.stringify(input),
                headers: {
                    "Authorization": "Token " + token,
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.status !== 200) {
                        alert(response.status)
                    }
                })
        }
    });
    mod_div2.appendChild(my_form)
    span.addEventListener("click", () => {
        mod_div.style.display = "none";

    })
    window.onclick = function (event) {
        if (event.target == mod_div) {
            mod_div.style.display = "none";
        }

    }
}
export default newpost;