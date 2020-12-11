import feed from "./feed.js";
//runs by default waiting for user input when login button is clicked
function login(apiUrl) {
  //
  let loginbutton = document.querySelectorAll("[data-id-login]");
  let placement = document.getElementById("nav");
  loginbutton = Array.from(loginbutton)[0];
  let old_form = null;
  //If already logged in 
  if (localStorage.getItem("token")) {
    let signupbutton = document.querySelectorAll("[ data-id-signup]");
    signupbutton = Array.from(signupbutton)[0];
    signupbutton.style.visibility = "hidden";
    loginbutton.style.visibility = "hidden"
    feed(apiUrl, localStorage.getItem("token"), 0)
    let logoutbutton = document.createElement("button")
    logoutbutton.innerText = "Logout"
    logoutbutton.setAttribute("class", "button button-primary")
    let heading = document.getElementById("mainhead")
    heading.appendChild(logoutbutton);
    logoutbutton.addEventListener("click", () => {
      localStorage.clear();
      heading.removeChild(logoutbutton);
    })
  }
  //form creation and fetch when login clicked
  loginbutton.addEventListener("click", () => {
    loginbutton.style.visibility = "hidden";
    if (old_form != null) placement.removeChild(old_form);
    const my_form = document.createElement("form");
    my_form.name = "Login-form";
    my_form.method = "POST";
    const my_username = document.createElement("Input");
    my_username.name = "username";
    my_username.type = "text";
    my_username.placeholder = "username-LOGIN";
    const my_password = document.createElement("Input");
    my_password.name = "password";
    my_password.type = "password";
    my_password.placeholder = "password-LOGIN";
    my_form.appendChild(my_username);
    my_form.appendChild(my_password);
    placement.appendChild(my_form);
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.innerText = "Log-in";
    my_form.appendChild(submitButton);
    old_form = my_form;

    my_username.addEventListener("keypress", e => {
      let key = e.which || e.keyCode;
      if (key == 13) {
        my_password.focus();
      }
    });

    function ResponseStatus(response) {
      if (response.status == 200) {
        return response.json();
      } else {
        alert("Invalid-username/password");
      }
    }

    function ResolveToken(token) {
      if (typeof token !== "undefined") {
        my_form.style.visibility = "hidden";
        let signupbutton = document.querySelectorAll("[ data-id-signup]");
        signupbutton = Array.from(signupbutton)[0];
        signupbutton.style.visibility = "hidden"
        localStorage.setItem("token", token)
        feed(apiUrl, token, 0);
        let logoutbutton = document.createElement("button")
        logoutbutton.innerText = "Logout"
        logoutbutton.setAttribute("class", "button button-primary")
        let heading = document.getElementById("mainhead")
        heading.appendChild(logoutbutton);
        logoutbutton.addEventListener("click", () => {
          localStorage.clear();
          heading.removeChild(logoutbutton);
        })
      }
    }

    my_form.addEventListener("submit", e => {
      e.preventDefault();
      const input = {
        username: my_form.username.value,
        password: my_form.password.value
      };

      fetch(String(apiUrl) + "/auth/login", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => ResponseStatus(response))
        .then(response => ResolveToken(response.token));
    });
  });

}
export default login;

//Figutr out when to get and post and how to do it.
//difference betweeen parameters and json objects
