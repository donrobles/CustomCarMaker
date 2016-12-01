//This code is only ran on the client side.
if (Meteor.isClient) {
    //After logging-in, run this function.
    Accounts.onLogin(function () {
        //Redirect to FlowRouter route named 'recipe-book'.
        FlowRouter.go('start');
    });

    //After logging-out, run this function.
    Accounts.onLogout(function () {
        //Redirect to FlowRouter route named 'home'.
        FlowRouter.go('home');
    });
}

FlowRouter.route('/', {
    name: 'home', //The name of the route, must be unique.
    action(){
        BlazeLayout.render('Welcome');
    }
});

FlowRouter.route('/start', {
    name: 'start', //The name of the route, must be unique.
    action(){
        BlazeLayout.render('MainLayout', {main: 'Hello'});
    }
});
