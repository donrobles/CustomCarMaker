/**
 * Created by pc on 2/9/2017.
 */
import {Template} from "meteor/templating";

(function () {
  "use strict";

  Template.content.onCreated(function () {
    var data = this.data;
    console.log("onCreated: ", data);
  });

  Template.content.onRendered(function () {
    var data = this.data;
    console.log("onRendered: ", data);
  });

  Template.content.helpers({
    exclamation: function () {
      var data = Template.instance().data;
      return "That's a lot of " + data.contentType + "!";
    }
  });

  Template.content.events({
    "click .list-group-item": function () {
      console.log("name: ", this.name);
      console.log("creator: ", this.creator);
    }
  });
}());