
# Message to Team
# YT - July 1 2017
- styling required(master buttons, create a center holder to hold project list, demo etc)




# Current challenges
2. 	opacity = 0 will still take up the space unless we use absolute position. 
	


1. 	the current approach to show/hide contents is too complex to be maintained when
	there are more sections. 
	e.g. the demo is visible, there are three master buttons that would close the demo
	(navigate away to programming, project list, resume), now we want to add more, a back button,
	or some other way that allows us to navigate away. And we have to do this for all the sections visible.
	
	=================================================================================
		a better way/simpler way is required to hide/show contents/sections
	=================================================================================

	--------------------------------------------------------------------------------------------------------------------------
	#KIKAHO - July 1 2017 
	I haven't start working on it yet but I thought it would be simple, 
	I may be wrong but here is what I thought how it would work:
	Similar to how the buttons on http://www.etiennegodiard.com/ works, 
	there is no previous page tracking, you can jump from anywhere to the major pages (Works & About)
	(eg: able to jump from "work list", "detailed project", etc. to "About" without any additional step or back button)
	
	There are 3 layers:
	1. TOP: 
		PROGRAMMING | RESUME | MUSIC - always visible
		BACK, PREV, NEXT - hide initially, shown only on demo page
		
	2. CENTER: 
		Bunch of different <div> with the same size and position but with different content
		Change visibility according to which button is pressed at what page
		eg:
		//From "landing page" to "programming list"
		if (pressed "programming" button) { programming list's div opacity = 1, others opacity = 0}
		
		//From "programming list" to "demo"
		if (pressed a demo) {that demo's opacity = 1, others opacity = 0}
		
		//From "demo" back to "programming list"
		if (pressed "back" button && was on "programming" page) {programming list's div opacity = 1, others opacity = 0}
		
		Basically, all pages are independant, each buttons (except for "back") are assigned to a particular page, 
		pressing A button will trigger A's opacity to 1, others back to 0, and so on.
		So there's no need for tracking which page you're in except for "back" button, 
		which you just have to track the very last page visited.
		
		Now that I think of it, we might not even need slicker for this, but maybe we can use it for image gallery.
		
		
	3. BOTTOM: 
		Hovering background image/video(?)
	
	Correct me if I missed something.
	--------------------------------------------------------------------------------------------------------------------------
	

2. the demo has to be visible for slick(slider) so that it can be initialized,
	so the current approach is [demo visible -> slick(initialize) -> hide demo].
	this creates an awkward flash of demo on initial load

	=================================================================================
		1. create a loader on initial load to hide contens until fully loaded
		2. opacity = 0 initially
		????
	=================================================================================
	
	---------------------------------------------------------------------------------------------
	#KIKAHO - July 1 2017
	Load initially with opacity = 0 might work
	or can we do a loading bar and wait for the page to be fully loaded before showing the page?
	---------------------------------------------------------------------------------------------
	

# Usage
1. Show Demo
- Click on Projects
- Click on first list [Video Game Engine]


#KIKAHO July 1 2017
- Use rectangular with text for buttons (eg. text in a div or rect), instead of <button>, unless <button> can achieve the same look
