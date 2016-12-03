//This code is only ran on the client side.
if (Meteor.isClient) {
    //After logging-in, run this function.
    Accounts.onLogin(function () {
        roleRedirect(Meteor.userId());
    });

    //After logging-out, run this function.
    Accounts.onLogout(function () {
        //Redirect to FlowRouter route named 'root'.
        FlowRouter.go('root');
    });

    function roleRedirect(meteorUserId) {
        debugger;
        var roles = Roles.getRolesForUser(meteorUserId); //Grab user roles
        console.log("User Roles: " + roles.toString());

        //Build array from roles cursor.
        var allRoles = [];
        Roles.getAllRoles().forEach(function (roleCursor) {
            allRoles.push(roleCursor.name);
        });
        console.log(allRoles);
        //Check that the user has a valid role.
        if (Roles.userIsInRole(meteorUserId, allRoles)) {
            /*
             Should make these Strings constants.
             */
            //Redirect the user based on their Role.
            if (Roles.userIsInRole(meteorUserId, 'customer')) {
                console.log("customer");
                FlowRouter.go('customer');
            } else if (Roles.userIsInRole(meteorUserId, 'admin')) {
                console.log("admin");
                FlowRouter.go('admin');
            } else if (Roles.userIsInRole(meteorUserId, 'superadmin')) {
                console.log("superadmin");
                FlowRouter.go('superadmin');
            }
        } else {
            //If there's no valid user role, throw an error.
            //NOTE: This shouldn't be possible.
            FlowRouter.go('error', {httpCode: "500"});
        }
    }
}

FlowRouter.route('/', {
    name: 'root',
    action: function () {
        //Check if someone is logged-in when landing in the base dir.
        if (Meteor.userId()) {
            // Direct User to their appropriate page.
            // FlowRouter.go('customer');
            // FlowRouter.go('admin');
            FlowRouter.go('superadmin');
        } else {
            BlazeLayout.render('LoginLayout');
        }
    },
    triggersEnter: [function (context, redirect) {
        console.log('running root / trigger');
    }]
});

//Show an error page based on the httpCode URL parameter.
FlowRouter.route('/error/:httpCode', {
    name: 'error',
    action: function (params, queryParams) {
        BlazeLayout.render('BaseError', {httpcode: 'http' + params.httpCode});
    },
});

//Base login page.
FlowRouter.route('/login', {
    name: 'login',
    action: function () {
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