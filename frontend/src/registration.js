//triggered by default and produces form when signup button is clicked
function sgnup(apiUrl) {
  let token = "";
  let sgnupbutton = document.querySelectorAll("[data-id-signup]");
  let placement = document.getElementById("nav");
  sgnupbutton = Array.from(sgnupbutton)[0];
  let old_form = null;

  sgnupbutton.addEventListener("click", () => {
    sgnupbutton.style.visibility = "hidden"
    if (old_form != null) placement.removeChild(old_form);
    const my_form = document.createElement("form");
    my_form.name = "sgnup-form";
    my_form.method = "POST";
    const my_username = document.createElement("Input");
    my_username.name = "username";
    my_username.type = "text";
    my_username.placeholder = "username-SIGNUP";
    const my_password = document.createElement("Input");
    my_password.name = "password";
    my_password.type = "password";
    my_password.placeholder = "password-SIGNUP";
    const my_email = document.createElement("Input");
    my_email.name = "email";
    my_email.type = "text";
    my_email.placeholder = "E-mail-SIGNUP";
    const my_name = document.createElement("Input");
    my_name.name = "name";
    my_name.type = "text";
    my_name.placeholder = "name-SIGNUP";
    my_form.appendChild(my_username);
    my_form.appendChild(my_password);
    my_form.appendChild(my_email);
    my_form.appendChild(my_name);
    placement.appendChild(my_form);
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.innerText = "Sign-up";
    my_form.appendChild(submitButton);
    old_form = my_form;

    function ResponseStatus(response) {
      if (response.status == 200) {
        return response.json();
      } else if (response.status === 409) {
        alert("Username taken");
      } else {
        alert("invalid input");
      }
    }

    my_form.addEventListener("submit", e => {
      e.preventDefault();
      const input = {
        username: my_form.username.value,
        password: my_form.password.value,
        email: my_form.email.value,
        name: my_form.name.value
      };
      if (my_form.email.value) {
        const pattern = /^\w+@\w+\.\w+$/;
        if (!pattern.exec(my_form.email.value)) {
          alert("Invalid Email")
        } else {
          fetch(String(apiUrl) + "/auth/signup", {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(response => ResponseStatus(response));

        }
      }

    });
  });
}

export default sgnup;
