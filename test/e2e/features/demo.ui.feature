Feature: Page Login
	As a user, I want to login to the page

	@accessibility
	@smoke1
	Scenario: user login with valid credentials
		Given user navigate to the target login page
		And user enter "admin" and "admin"
		When user click the login button
		Then user should successfully login

	@smoke2
	Scenario: Number of users displayed when user tab is clicked
		Given user is at user page
		When user clicks on User Tab in user page
		Then user should see all the user details in user page

