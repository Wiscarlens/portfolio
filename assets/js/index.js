// My own JS script for index.html
$(document).ready(function() {
    showInfoAlert("<h3 style='color:#18d26e;'>Info</h3>", "<h6>This is a ficticious portfolio created to showcase web development skills</h6>");
    grabContentForDetailsPage();
    sendContactInfoToServer();
});

function showInfoAlert(titleHTML, messageHTML)
{
    // Show an info alert to tell the user this is a ficticious page
    // Only show it when the user has not navigated other pages
    const currentUrl = window.location.href;

    // User is in raw index.html page and has not visited any section
    if (!currentUrl.includes("#") && !currentUrl.includes("portfolio-details.html"))
    {
        $.jAlert({
            "title": titleHTML,
            "content": messageHTML,
            "theme": "black",
        });
    }
}

function showErrorAlert(errorMessage)
{
    // Show an error jAlert when something went wrong
    errorAlert(errorMessage);
}

function grabContentForDetailsPage()
{
    // Grab all div elements with a class "portfolio-links"
    const portfolioDetailsLinksContainers = $("div.portfolio-links");

    // Loop through each div
    portfolioDetailsLinksContainers.each(function(i) {

        // Grab the current number for this container
        const currentContainerNum = i + 1;

        // Grab the current div
        const currentPortfolioDetailsLinkContainer = $(this);

        // Grab both <a> link tags which are the children of this div
        const currentPortfolioDetailsLinks = currentPortfolioDetailsLinkContainer.find("a");

        // Grab the first and second link separately
        const currentPortfolioDetailsLink = currentPortfolioDetailsLinks.eq(1);

        const currentPortfolioDetailsLinkLocation = currentPortfolioDetailsLink.attr("href");
        
        // Add a click event to the second link
        currentPortfolioDetailsLink.on("click", function(e) {
            // Form a JSON AJAX request to the server with the following information
            /*
                {
                    "type" : title of first link
                }

                Intended response is
                {
                    "title": Project Title
                    "category": Project Category
                    "company": Company/Organization
                    "date": Date of completion
                    "description": Project Description
                }
            */
           // Prevent default behaviour
           e.preventDefault();

          $.ajax({
            url: portfolioDetailsBackEndProcessorLink,
            type: "POST",
            data: JSON.stringify({
                "id": currentContainerNum
            }),
            success: function(response)
            {
                // Add image URL data to the JSON response from the server
                let jsonResponse = response;
                jsonResponse['image_url'] = "assets/img/portfolio/portfolio-" + currentContainerNum + ".jpg";

                // Stringify the response in JSON
                const jsonResponseStringVersion = JSON.stringify(jsonResponse);

                // Set it to sessionStorage
                sessionStorage.setItem("portfolioDetails", jsonResponseStringVersion);

                // Go to desired location
                window.location.href = coreURL + currentPortfolioDetailsLinkLocation;

            },
            error: function(xhr, status, error)
            {
                //console.log("AJAX request error: ", xhr, status, error);
                // Show jAlert error to the user
                showErrorAlert("<div><p>Couldn't get information about this portfolio project.</p><p>Try again later</p></div>");
            }
          });
           
        });

    });
}

function addClassIfAbsent(element, classToAdd)
{
    /* Add a class to a DOM element if it doesn't have it */
    if (!element.hasClass(classToAdd))
    {
        element.addClass(classToAdd);
    }
}

function removeClassIfPresent(element, classToRemove)
{
    /* Remove a class from an element if it has it */
    if (element.hasClass(classToRemove))
    {
        element.removeClass(classToRemove);
    }
}

function isInvalidField(conditionForInvalid, element)
{
    /* Show an element as invalid or not according to a given condition */
    if (conditionForInvalid)
    {
        addClassIfAbsent(element, "is-invalid");
        return true;
    }

    else
    {
        removeClassIfPresent(element, "is-invalid");
        return false;
    }
}

function sendContactInfoToServer()
{
    /* Send the contact info to the server */

    // Grab the contact form
    const contactForm = $("form#contact-form");

    // Listen for the submit event
    contactForm.on("submit", function(e) {
        // Prevent default event
        e.preventDefault();

        // Grab elements that hold required data
        const nameElement = $("input#name");
        const emailElement = $("input#email");
        const subjectElement = $("input#subject");
        const messageElement = $("textarea[name='message']");

        // Grab required data from elements
        const name = nameElement.val();
        const email = emailElement.val();
        const subject = subjectElement.val();
        const message = messageElement.val();

        // Regex for Form Validation
        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        // Check for any invalid element
        isInvalidField(!nameRegex.test(name), nameElement);
        isInvalidField(!emailRegex.test(email), emailElement);
        isInvalidField(subject.length === 0, subjectElement);
        isInvalidField(message.length === 0, messageElement);

        // Provide an AJAX request in order to submit this to the back-end
        $.ajax({
            url: contactBackEndProcessorLink,
            type: "POST",
            data: JSON.stringify({
                "name" : name,
                "email" : email,
                "subject": subject,
                "message": message
            }),
            success: function(response)
            {

            },
            error: function(xhr, status, error)
            {
                showErrorAlert("<div><p>Couldn't send your message.</p><p>Try again later</p></div>");
            }
        });


    });

}