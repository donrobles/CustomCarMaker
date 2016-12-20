import {Meteor} from "meteor/meteor";
import {Session} from "meteor/session";
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
        debugger;
        console.log(allRoles);
        //Check that the user has a valid role.
        if (Roles.userIsInRole(meteorUserId, allRoles)) {
            /*
             Should make these Strings constants.
             */
            //Redirect the user based on their Role.
            if (Roles.userIsInRole(meteorUserId, "customer")) {
                console.log("customer");
                FlowRouter.go("customerDb");
            } else if (Roles.userIsInRole(meteorUserId, "admin")) {
                console.log("admin");
                FlowRouter.go("adminDb");
            } else if (Roles.userIsInRole(meteorUserId, "superadmin")) {
                console.log("superadmin");
                FlowRouter.go("superadminDb");
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
            debugger;
            Meteor.logoutOtherClients();
            Session.set("loggedIn", true);

            let redirect = Session.get("redirectAfterLogin");
            if (redirect !== null && redirect !== undefined) {
                if (redirect !== "/login") {
                    return FlowRouter.go(redirect);
                }
            }
            roleRedirect(Meteor.userId());
        });
        //After logging-out, run this function.
        Accounts.onLogout(function () {
            //Reset any keys in the Session.
            Object.keys(Session.keys).forEach(function (key) {
                Session.set(key, undefined);
            });
            //Remove any connection to the old Session.keys object.
            Session.keys = {};
            //Redirect to FlowRouter route named "root".
            FlowRouter.go("welcome");
        });
    }

    /*Public Routes*/
    const publicGroup = FlowRouter.group({});

    publicGroup.route("/", {
        name: "root",
        action: function () {
            console.log("public root route");
            FlowRouter.go(FlowRouter.path("welcome"));
        },
    });

    publicGroup.route("/login", {
        name: "login",
        action: function () {
            console.log("public login route");
            BlazeLayout.render("LoginLayout");
        },
    });

    publicGroup.route("/welcome", {
        name: "welcome",
        action: function () {
            console.log("public welcome route");
            BlazeLayout.render("Welcome");
        },
    });

    /*Private routes*/
    const loggedInGroup = FlowRouter.group({
        triggersEnter: [function () {
            console.log("loggedIn group trigger");
            let route;
            if (!(Meteor.loggingIn() || Meteor.userId())) {
                route = FlowRouter.current();
                if (route.route.name !== "login") {
                    Session.set("redirectAfterLogin", route.path);
                }
                return FlowRouter.go(FlowRouter.path("login"));
            }
        }]
    });

    /*Customer Routes*/
    const customerGroup = loggedInGroup.group({
        prefix: "/customer",
        triggersEnter: [function () {
            console.log("customer group trigger");
            debugger;
            if (!(Roles.userIsInRole(Meteor.userId(), "customer"))) {
                return FlowRouter.go(FlowRouter.path("welcome"));
            }
        }]
    });

    customerGroup.route("/dashboard", {
        name: "customerDb",
        action: function () {
            console.log("customer dashboard route");
            BlazeLayout.render("MainLayout", {main: "Customer"});
        }
    });

    /*Admin Routes*/
    const adminGroup = loggedInGroup.group({
        prefix: "/admin",
        triggersEnter: [function () {
            console.log("admin group trigger");
            if (!Roles.userIsInRole(Meteor.userId(), "admin")) {
                return FlowRouter.go(FlowRouter.path("welcome"));
            }
        }]
    });

    adminGroup.route("/dashboard", {
        name: "adminDb",
        action: function () {
            console.log("admin dashboard route");
            BlazeLayout.render("MainLayout", {main: "Admin"});
        }
    });

    /*Superadmin Routes*/
    const superAdminGroup = loggedInGroup.group({
        prefix: "/superadmin",
        triggersEnter: [function () {
            console.log("superadmin group trigger");
            if (!Roles.userIsInRole(Meteor.userId(), "superadmin")) {
                return FlowRouter.go(FlowRouter.path("welcome"));
            }
        }]
    });

    superAdminGroup.route("/dashboard", {
        name: "superadminDb",
        action: function () {
            console.log("superadmin dashboard route");
            BlazeLayout.render("MainLayout", {main: "Superadmin"});
        }
    });

//Show an error page based on the httpCode URL parameter.
    FlowRouter.route("/error/:httpCode", {
        name: "error",
        action: function (params) {
            BlazeLayout.render("BaseError", {httpcode: "http" + params.httpCode});
        },
    });

}());