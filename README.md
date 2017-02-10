# CustomCarMaker
A Meteor based site to practice/develop front-end/JavaScript skills and general learning of the Meteor framework as practice for another future application development.

The application will have 3 types of users; ***Customers***, ***Admins***, and ***Superadmins***.

***Customers*** will be the default user role for anyone who registers on the application. Once registered, they will be able to create custom car orders, using options like *Car Model*, *Color*, and *All Wheel Drive*. Each option will have an associated cost, and the customer will see the estimated cost as they select options for their order. Each order created will have a *Stock Model* cost that is available if the customer selects no custom options.

***Admins*** will be an assigned user role done manually in the application, for sake of keeping roles/routing simple (at least initially). ***Admins*** will be able to enter new customization options that ***Customers*** can select, such as adding *Heated Seats*, *Fog Lights*, and the like, along with their associated cost. ***Admins*** will also be able to review ***Customer*** orders and can change their status from *Unapproved* to *Approved*. Finally, they will also be able to cancel/delete orders entirely after entering a confirmation code. 

***Superadmins*** will be the admin who can create ***Admins***. I haven't thought out much else the role will be able to do, but this whole project's intention is for me to learn more about Meteor, so expect things to change as I continue working on it and figuring things out. I mean, as of the time of this writing, I've had to rework how routing is done twice, and I may have to redo it again! But all in the name of progress, am I right?

##Useful Information
These are some links that I've had to read to learn what I needed to know in order to build this application. I included them here as a future reference for myself and whoever else wants to learn more about Meteor. I figure if you're looking at this project, you're actively trying to figure some stuff out, so hopefully this will help you where I needed help at one time. 

[Dynamic Templates](https://themeteorchef.com/tutorials/using-dynamic-templates#!) (This has been very helpful)

[Flow Router/Client-Side Routing](https://themeteorchef.com/tutorials/client-side-routing-with-flow-router) (This has been very helpful too)

[Publication/Subscription Patterns](https://themeteorchef.com/tutorials/publication-and-subscription-patterns) (Haven't read through this fully, but will update afterward: 2/9/17)

[The "Official Solution" for authentication/authorization handling](https://kadira.io/academy/meteor-routing-guide/content/implementing-auth-logic-and-permissions) (Still trying to figure this out.)

[Useful FlowRouter Patterns](https://blog.tableflip.io/flow-router-some-useful-patterns/) (Some good stuff to know. Also mentions Meteor subscription limits with FlowRouter.)