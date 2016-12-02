//This code is only ran on the client side.
if (Meteor.isClient) {
    //After logging-in, run this function.
    Accounts.onLogin(function () {
        var role = Roles.getRolesForUser(Meteor.userId());
        //Need to implement user/admin authentication
        switch (role) {
            case "customer": {
                FlowRouter.go('customer');
                break;
            }
            case "admin": {
                FlowRouter.go('admin');
                break;
            }
            case "superadmin": {
                FlowRouter.go('superadmin');
                break;
            }
            default: {
                console.error("You shouldn't be seeing this error");
            }
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
        BlazeLayout.render('LoginLayout')
    },
});

/* This is where customer routes will go */
var customerGroup = FlowRouter.group({
    prefix: '/customer',
    name: 'customer',
    triggersEnter: [function (context, redirect) {
        console.log('running customer triggers');
    }]
});

// handling /customer route
customerGroup.route('/', {
    action: function () {
        // BlazeLayout.render('Welcome');
    },
    triggersEnter: [function (context, redirect) {
        console.log('running customer / trigger');
    }]
});

/* This is where admin routes will go */
var adminGroup = FlowRouter.group({
    prefix: '/admin',
    name: 'admin',
    triggersEnter: [function (context, redirect) {
        console.log('running admin triggers');
    }]
});

// handling /admin route
adminGroup.route('/', {
    action: function () {
        // BlazeLayout.render('Welcome');
    },
    triggersEnter: [function (context, redirect) {
        console.log('running admin / trigger');
    }]
});

/* This is where admin routes will go */
var superAdminGroup = FlowRouter.group({
    prefix: '/superadmin',
    name: 'superadmin',
    triggersEnter: [function (context, redirect) {
        console.log('running admin triggers');
    }]
});

// handling /superadmin route
adminGroup.route('/', {
    action: function () {
        // BlazeLayout.render('Welcome');
    },
    triggersEnter: [function (context, redirect) {
        console.log('running admin / trigger');
    }]
});