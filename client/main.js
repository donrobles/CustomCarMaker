import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

(function () {
    "use strict";

    Template.onlyIfLoggedIn.helpers({
        authInProcess: function () {
            return Meteor.loggingIn();
        },
        canShow: function () {
            return !!Meteor.user();
        }
    });

    Template.editPost.helpers({
        authInProcess: function () {
            var postSubReady = Template.instance().postSubReady.get();
            return Meteor.loggingIn() || !postSubReady;
        },
        canShow: function () {
            var user = Meteor.user();
            if (!user) {
                return false;
            }

            var postId = FlowRouter.getParam("postId");
            var post = Posts.findOne({_id: postId});
            if (!post) {
                return false;
            }

            return post.owner === user._id;
        }
    });

    Template.MainLanding.helpers({
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
}());
