//Self calling wrapper function to call the "use strict" setting once for the file.
(function () {
    "use strict";

    /*Public Routes*/
    const publicGroup = FlowRouter.group({});

    publicGroup.route("/", {
        name: "root",
        action: function () {
            console.log("public root route");
            BlazeLayout.render("MainLayout", {main: "Welcome"});
        },
    });

    publicGroup.route("/index", {
        name: "index",
        action: function () {
            console.log("public index route");
            BlazeLayout.render("index");
        },
    });

    publicGroup.route("/login", {
        name: "login",
        action: function () {
            console.log("public login route");
            FlowRouter.go(FlowRouter.path("testpath"));
        },
    });

//Show an error page based on the httpCode URL parameter.
    FlowRouter.route("/error/:httpCode", {
        name: "error",
        action: function (params) {
            BlazeLayout.render("BaseError", {httpcode: "http" + params.httpCode});
        },
    });

}());