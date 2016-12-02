//This code is only ran on the client side.
if (Meteor.isClient) {
    //After logging-in, run this function.
    Accounts.onLogin(function () {
        //Redirect to FlowRouter route named 'start'.
        FlowRouter.go('start');
    });

    //After logging-out, run this function.
    Accounts.onLogout(function () {
        //Redirect to FlowRouter route named 'home'.
        FlowRouter.go('login');
    });
}

FlowRouter.triggers.enter([function (context, redirect) {
    if (!Meteor.userId()) {
        //Store the previous route
        FlowRouter.go('welcome');
    }
}]);

FlowRouter.route('/', {
    name: 'welcome', //The name of the route, must be unique.
    action(){
        BlazeLayout.render('Welcome');
    }
});

FlowRouter.route('/login', {
    name: 'login', //The name of the route, must be unique.
    action(){
        BlazeLayout.render('LoginLayout');
    }
});

FlowRouter.route('/start', {
    name: 'start', //The name of the route, must be unique.
    action(){
        //Add logic checking for User or Admin. Show relevant template.
        BlazeLayout.render('MainLayout', {main: 'Customer'});
    }
});
