import {Template} from "meteor/templating";

(function () {
    "use strict";

    Template.Welcome.helpers({
        isCustomer: function () {
            return false;
        },
        isAdmin: function () {
            return false;
        },
        isSuperAdmin: function () {
            return false;
        }
    });

    Template.index.onCreated(function () {
        this.currentTab = new ReactiveVar("books");
    });

    Template.index.helpers({
        tab: function () {
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

            return {contentType: tab, items: data[tab]};
        },
    });

    Template.index.events({
        "click .nav-pills li": function (event, template) {
            let clickedTab = $(event.target).closest("li");

            clickedTab.addClass("active");
            $(".nav-pills li").not(clickedTab).removeClass("active");

            template.currentTab.set(clickedTab.data("template"));
        }
    });
}());
