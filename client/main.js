import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

import "./layout/partials/Login.html";

(function () {
    "use strict";

    Template.Login.onCreated(function loginOnCreated() {
        return 0;
    });

    Template.Login.helpers({});

    Template.Login.events({});

    Template.onlyIfLoggedIn.helpers({
        authInProcess: function() {
            return Meteor.loggingIn();
        },
        canShow: function() {
            return !!Meteor.user();
        }
    });

    Template.editPost.onCreated(function() {
        var self = this;
        self.postSubReady = new ReactiveVar();
        self.autorun(function() {
            var postId = FlowRouter.getParam("postId");
            var subHandle = self.subscribe("singlePost", postId);
            self.postSubReady.set(subHandle.ready());
        });
    });

    Template.editPost.helpers({
        authInProcess: function() {
            var postSubReady = Template.instance().postSubReady.get();
            return Meteor.loggingIn() || !postSubReady;
        },
        canShow: function() {
            var user = Meteor.user();
            if(!user) {
                return false;
            }

            var postId = FlowRouter.getParam("postId");
            var post = Posts.findOne({_id: postId});
            if(!post) {
                return false;
            }

            return post.owner === user._id;
        }
    });
}());
