
# Message to Team
# YT - July 1 2017
- styling required(master buttons, create a center holder to hold project list, demo etc)


# Current challenges
1. 	the current approach to show/hide contents is too complex to be maintained when
	there are more sections. 
	e.g. the demo is visible, there are three master buttons that would close the demo
	(navigate away to programming, project list, resume), now we want to add more, a back button,
	or some other way that allows us to navigate away. And we have to do this for all the sections visible.

	=================================================================================
		a better way/simpler way is required to hide/show contents/sections
	=================================================================================

2. the demo has to be visible for slick(slider) so that it can be initialized,
	so the current approach is [demo visible -> slick(initialize) -> hide demo].
	this creates an awkward flash of demo on initial load

	=================================================================================
		1. create a loader on initial load to hide contens until fully loaded
		2. opacity = 0 initially
		????
	=================================================================================

# Usage
1. Show Demo
- Click on Projects
- Click on first list [Video Game Engine]