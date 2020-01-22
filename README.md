# GitHub Process


### Before you start a feature

Make sure you are on the `dev` branch in your terminal

Create a new branch `git checkout -b *feature-name*`

When you complete one of the checklist items for the feature found in Meistertask:

Add and commit your work! You can copy the message from Meistertask, or create your own.

**Note**: You do not have to push the branch at this time


### Before you submit a pull request

Make sure you are on the `dev` branch in GitHub

If you did not add a meaningful commit message on the command line, add one now

**Front End** Please include a screenshot of your progress with your PR

Link your PR in the team Slack


### When you are pulling from `dev`

Make sure you are on the `dev` branch in your terminal

Update your `dev` branch `git pull origin dev`

Update your system with any db changes `npm run db:import` 

Install new packages (if any) `npm install`

**If you are currently working on a feature and wish to update your feature branch**

`git checkout dev`

`git pull origin dev`

`git checkout *your feature branch*`

`git merge dev`
