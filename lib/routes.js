//This code is only ran on the client side.
if (Meteor.isClient) {
    //After logging-in, run this function.
    Accounts.onLogin(function () {
        var userId = Meteor.userId();
        var allRoles = Roles.getAllRoles();
        var roles = Roles.getRolesForUser(userId);
        console.log("User Roles: " + roles.toString());


        if (Roles.userIsInRole(userId, ['customer', 'admin', 'superadmin'])) {
            if (Roles.userIsInRole(userId, 'customer')) {
                console.log("customer");
                FlowRouter.go('customer');
            } else if (Roles.userIsInRole(userId, 'admin')) {
                console.log("admin");
                FlowRouter.go('admin');
            } else if (Roles.userIsInRole(userId, 'superadmin')) {
                console.log("superadmin");
                FlowRouter.go('superadmin');
            }
        } else {
            console.error("You shouldn't be seeing this error");
        }
    });

    //After logging-out, run this function.
    Accounts.onLogout(function () {
        //Redirect to FlowRouter route named 'root'.
        FlowRouter.go('root');
    });
}

FlowRouter.route('/', {
    name: 'root',
    action() {
        FlowRouter.go('login');
    },
    triggersEnter: [function (context, redirect) {
        console.log('running root / trigger');
    }]
});

FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render('LoginLayout');
    },
});

/* This is where customer routes will go */
var customerGroup = FlowRouter.group({
    prefix: '/customer',
    triggersEnter: [function (context, redirect) {
        console.log('running customer triggers');
    }]
});

// handling /customer route
customerGroup.route('/', {
    name: 'customer',
    action: function () {
        BlazeLayout.render('MainLayout', {main: 'Customer'});
    },
    triggersEnter: [function (context, redirect) {
        console.log('running customer / trigger');
    }]
});

/* This is where admin routes will go */
var adminGroup = FlowRouter.group({
    prefix: '/admin',
    triggersEnter: [function (context, redirect) {
        console.log('running admin triggers');
    }]
});

// handling /admin route
adminGroup.route('/', {
    name: 'admin',
    action: function () {
        BlazeLayout.render('MainLayout', {main: 'Admin'});
    },
    triggersEnter: [function (context, redirect) {
        console.log('running admin / trigger');
    }]
});

/* This is where superadmin routes will go */
var superadminGroup = FlowRouter.group({
    prefix: '/superadmin',
    triggersEnter: [function (context, redirect) {
        console.log('running superadmin triggers');
    }]
});

// handling /superadmin route
superadminGroup.route('/', {
    name: 'superadmin',
    action: function () {
        BlazeLayout.render('MainLayout', {main: 'Superadmin'});
    },
    triggersEnter: [function (context, redirect) {
        console.log('running superadmin / trigger');
    }]
});