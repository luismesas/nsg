// register iris components
//   - welcome.js are the initial screen and welcome.html its template
iris.path = {
    welcome : { js : "screen/welcome.js", html : "screen/welcome.html" }
};

$(document).ready(
    function () {

        // initialize application
        iris.welcome( iris.path.welcome.js );
    }
);