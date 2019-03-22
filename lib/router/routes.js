
FlowRouter.route('/', {
  name: "home",
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      main: "home",
      nav: "nav",
    });
  }
});

FlowRouter.route('/team', {
  name: "team",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      main: "team",
      nav: "nav",
    });
  }
});

FlowRouter.route('/profile', {
  name: "profile",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      main: "profile",
      nav: "nav",
    });
  }
});

FlowRouter.route('/team/:_id', {
  name: "viewTeam",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      main: "viewTeam",
      nav: "nav",
    });
  }
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "pageNotFound",
      nav: "nav",
    });
  }
};


//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
//workaround to override the accouts ui template for signin
// delete AccountsTemplates.routes.signIn;
AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin',
  template: 'login'
});
// delete AccountsTemplates.routes.signUp;
AccountsTemplates.configureRoute('signUp', {
  name: 'signup',
  path: '/signup',
  template: 'register'
});
AccountsTemplates.configureRoute('verifyEmail');
