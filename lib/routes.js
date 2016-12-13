import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";

//Self calling wrapper function to call the "use strict" setting once for the file.
(function () {
    "use strict";

//This code is only ran on the client side.
    function roleRedirect(meteorUserId) {
        let userRoles = Roles.getRolesForUser(meteorUserId); //Grab user roles
        console.log("User Roles: " + userRoles.toString());

        //Build array from roles cursor.
        let allRoles = [];
        Roles.getAllRoles().forEach(function (roleCursor) {
            this.push(roleCursor.name);
        }, allRoles);
        console.log(allRoles);
        //Check that the user has a valid role.
        if (Roles.userIsInRole(meteorUserId, allRoles)) {
            /*
             Should make these Strings constants.
             */
            //Redirect the user based on their Role.
            if (Roles.userIsInRole(meteorUserId, "customer")) {
                console.log("customer");
                FlowRouter.go("customer");
            } else if (Roles.userIsInRole(meteorUserId, "admin")) {
                console.log("admin");
                FlowRouter.go("admin");
            } else if (Roles.userIsInRole(meteorUserId, "superadmin")) {
                console.log("superadmin");
                FlowRouter.go("superadmin");
            }
        } else {
            //If there"s no valid user role, throw an error.
            //NOTE: This shouldn"t be possible.
            FlowRouter.go("error", {httpCode: "500"});
        }
    }

    if (Meteor.isClient) {
        //After logging-in, run this function.
        Accounts.onLogin(function () {
            roleRedirect(Meteor.userId());
        });

        //After logging-out, run this function.
        Accounts.onLogout(function () {
            //Redirect to FlowRouter route named "root".
            FlowRouter.go("login");
        });
    }

    const publicGroup = FlowRouter.group({});

    publicGroup.route("/login", {
        name: "login",
        action: function () {
            BlazeLayout.render("LoginLayout");
        },
    });

    publicGroup.route("/welcome", {
        name: "welcome",
        action: function () {
            BlazeLayout.render("Welcome");
        },
    });

//Show an error page based on the httpCode URL parameter.
    FlowRouter.route("/error/:httpCode", {
        name: "error",
        action: function (params) {
            BlazeLayout.render("BaseError", {httpcode: "http" + params.httpCode});
        },
    });

    /* This is where customer routes will go */
    const customerGroup = FlowRouter.group({
        prefix: "/customer",
        triggersEnter: [function () {
            console.log("running customer triggers");
        }]
    });

// handling /customer route
    customerGroup.route("/", {
        name: "customer",
        action: function () {
            BlazeLayout.render("MainLayout", {main: "Customer"});
        },
        triggersEnter: [function () {
            console.log("running customer / trigger");
        }]
    });

    /* This is where admin routes will go */
    const adminGroup = FlowRouter.group({
        prefix: "/admin",
        triggersEnter: [function () {
            console.log("running admin triggers");
        }]
    });

// handling /admin route
    adminGroup.route("/", {
        name: "admin",
        action: function () {
            BlazeLayout.render("MainLayout", {main: "Admin"});
        },
        triggersEnter: [function () {
            console.log("running admin / trigger");
        }]
    });

    /* This is where superadmin routes will go */
    const superadminGroup = FlowRouter.group({
        prefix: "/superadmin",
        triggersEnter: [function () {
            console.log("running superadmin triggers");
        }]
    });

// handling /superadmin route
    superadminGroup.route("/", {
        name: "superadmin",
        action: function () {
            BlazeLayout.render("MainLayout", {main: "Superadmin"});
        },
        triggersEnter: [function () {
            console.log("running superadmin / trigger");
        }]
    });
}());