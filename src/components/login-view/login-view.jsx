

import { useState } from "react";

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password,setPassword] =useState("");

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();
    
        const data = {
          access: username,
          secret: password
        };
    
        fetch("https://myflixdb5449.herokuapp.com/login.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        // transforms the response content into a JSON object that your code can use to extract the JWT sent by the myFlix API.
        .then((response) => response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                //You then pass the user and token back to MainView so they can be used in all the subsequent API requests.
                onLoggedIn(data.user, data.token);
              } else {
                alert("No such user");
              }
          })
          .catch((e) => {
            alert("Something went wrong");
          });
            if (response.ok) {
              onLoggedIn(username);
            } else {
              alert("Login failed");
            }
          };

      return (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text"
                   value= {username}
                   onChange={(e) => setUsername(e.target.value)}
                   required />
          </label>
          <label>
            Password:
            <input type="password"
                   value = {password}
                   onChange={(e) => setPassword(e.target.value)}
                   required />
          </label>
          <button type="submit">
            Submit
          </button>
        </form>
      );
    };