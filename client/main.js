import {Template} from "meteor/templating";

(function () {
  "use strict";

  Template.MainLayout.helpers({
    userRole: function () {
      return "Customer";
    }
  });

  /*Code for learning more about dynamic templates.*/
  Template.index.onCreated(function () {
    //Create ReactiveVar to track the currently selected template.
    this.currentTab = new ReactiveVar("books");
  });

  Template.index.helpers({
    tab: function () {
      //Return the current tab set to the ReactiveVar
      return Template.instance().currentTab.get();
    },
    tabData: function () {
      let tab = Template.instance().currentTab.get();

      let data = {
        "books": [
          {"name": "Seeking Wisdom: From Darwin to Munger", "creator": "Peter Bevelin"},
          {"name": "Hatchet", "creator": "Some Guy"},

        ],
        "movies": [
          {"name": "Ghostbusters", "creator": "Dan Aykroyd"},
          {"name": "Inception", "creator": "Chris Nolan"}

        ],
        "games": [
          {"name": "Grand Theft Auto V", "creator": "Rockstar Games"},
          {"name": "Tetris", "creator": "Tetris Guy"}
        ]
      };

      //Return an object with set "contentType" and "items" variables.
      return {contentType: tab, items: data[tab]};
    },
  });

  Template.index.events({
    //Click event for when one of the tabs is clicked.
    "click .nav-pills li": function (event, template) {
      //Grab the clicked tab.
      let clickedTab = $(event.target).closest("li");

      //Add the "active" class to the clicked tab.
      clickedTab.addClass("active");
      //Remove the "active" class from the tabs that AREN'T the clicked tab.
      $(".nav-pills li").not(clickedTab).removeClass("active");

      /*Set the Reactive Var "currentTab" to the clicked tab, setting the
       Dynamic template "data" variable to template of the clicked tab.*/
      template.currentTab.set(clickedTab.data("template"));
    }
  });
}());
