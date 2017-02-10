import {Accounts} from "meteor/accounts-base";
import {Meteor} from "meteor/meteor";
import {Session} from "meteor/session";

//Self calling wrapper function to call the "use strict" setting once for the file.
(function () {
  "use strict";

  if (Meteor.isClient) {
    Accounts.onLogin(function () {
      Meteor.logoutOtherClients();
      Session.set("loggedIn", true);
    });
  }
  /*Public Routes*/
  const publicGroup = FlowRouter.group({});

  publicGroup.route("/", {
    name: "root",
    action: function () {
      console.log("public root route");
      BlazeLayout.render("MainLayout");
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

  publicGroup.route("/test", {
    name: "test",
    action: function () {
      console.log("public test route");
      BlazeLayout.render("MainLayout", {template: "Admin"})
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