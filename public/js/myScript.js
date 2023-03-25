
// ---------------------------------------------------------------------------------------
/**
 * Apply succedd informations
 * @param {Object} theResult AJAX returned data
 * @param {Element} buttonRef button that was clicked
 * @returns {undefined}
 */
function returnBorrowSuccess(theResult, buttonRef) {
    if (buttonRef !== null) {
        // Get TD that owns the button
        var refTD = buttonRef.parentElement;
        if (refTD !== null) {
            // Remove button
            refTD.removeChild(buttonRef);
            // Set return date
            var currentDate = new Date(((Date)(theResult.returnedValue)));
            var currentDateStr = currentDate.toLocaleDateString();
            var text = document.createTextNode(currentDateStr);
            refTD.appendChild(text);
        }
    }
}

/**
 returnBorrow
 user returns a book
 @param {Element} buttonRef button that was clicked
 @param {int} borrowId ID of the borrowed item
 */
function returnBorrow(buttonRef, borrowId) {
    if (borrowId > 0) {
        // Collect data - empty

        // Ajax call
        $.ajax({
            url: "returnborrow.do",
            method: "POST",
            data: {
                "id": borrowId
            },
            success: function (theResult) {
                returnBorrowSuccess(theResult, buttonRef);
            },
            error: function (theResult, theStatus, theError) {
                console.log("Error : " + theStatus + " - " + theResult);
            }
        });
    }
}

// ---------------------------------------------------------------------------------------

