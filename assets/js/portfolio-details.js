/* Show Dynamic content for portfolio-details.html */
$(document).ready(function() {
    displayOnlyWhenProperlyReferred();
    displayStoredResults();
    clearSessionStorage();
});

function displayOnlyWhenProperlyReferred()
{
    // If this page was not loaded from a reference from index.html
    // Send us back to index.html
    const actualReferrer = document.referrer;

    if (!actualReferrer.includes("index.html") || !sessionStorage.getItem("portfolioDetails"))
    {
        window.location.href = mainPageLink;
    }
}

function displayStoredResults()
{
    // Display the results shown in session storage
    // Grab content from session storage
    const sessionStorageContent = sessionStorage.getItem("portfolioDetails");

    // Convert it into anobject
    const sessionStorageObject = JSON.parse(sessionStorageContent);

    // Grab required DOM elements
    const portfolioTitleElement = $("#portfolio-title");
    const portfolioImageElement = $("#portfolio-image");
    const portfolioCategoryElement = $("#portfolio-category");
    const portfolioCompanyElement = $("#portfolio-company");
    const portfolioDateElement = $("#portfolio-date");
    const portfolioDescriptionElement = $("#portfolio-description");

    // Set the text of each DOM element to its required property
    portfolioTitleElement.text(sessionStorageObject.title);
    portfolioImageElement.attr("src", sessionStorageObject.image_url);
    portfolioCategoryElement.text(sessionStorageObject.category);
    portfolioCompanyElement.text(sessionStorageObject.company);
    portfolioDateElement.text(sessionStorageObject.date);
    portfolioDescriptionElement.text(sessionStorageObject.description);
}

function clearSessionStorage()
{
    //Be sure to clear session Storage when it's no longer required
    $(window).on("beforeunload", function() {
        sessionStorage.removeItem("portfolioDetails");
    });
}