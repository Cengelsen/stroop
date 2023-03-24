### Stroop Game

This is a simple implementation of the Stroop experiment in the form of a game. This was made for a "Capture the Flag" event hosted by [friByte](https://fribyte.no/). 

I've rewritten it, so that it does not communicate with a backend.

### How to run locally

If you want to run this locally, i suggest you use a "live-reload" feature of some kind. For example, in VSCodium, there is an extension called "Live Server" by "ritwickdey". This serves the code on localhost. 

### CTF implementation

Here is a suggestion on how you can implement a fetch-request to a node-server to build a flag for each point the player gets:

Frontend:

```javascript
let counter = 0;
let flag = "";

/* ... */

function chooseColour(btn) {

    /* ... */

   /* If you guess correctly */
    if (btn.style.backgroundColor == headertxt) {

        console.log(flag)
        console.log(counter)
        fetch("/some-slug", { mode: 'cors' })
        .then(response => response.text())
        .then(message => {
	    message = message.split("").reverse().join("");
            flag += message[counter]
            console.log(message[counter])
            console.log(counter)
            counter++;
        })
        .catch(error => {
            console.error(error);
        })

        initialize();

    /* if you guess wrong */
    }else {
        counter = 0;
        flag = "";
        initialize();
    }

/* ... */

}

function victory() {

    /* ... */

        document.getElementById("ctf-flag").innerHTML = "Here is the flag: " + flag
        document.getElementById("ctf-flag").style.color = "white"

    /* ... */
}

```

Node-server:

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/some-slug', (req, res) => {
    res.send("some-string".split("").reverse().join(""));
});

app.use(express.static("public"));

app.listen(3002, () => {
    console.log('server is listening on port 3002');
})
```
