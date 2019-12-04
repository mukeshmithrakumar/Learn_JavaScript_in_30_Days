// AddressBook Function


// Boilerplate API: You can Ignore This function (getInitialContacts)
AddressBook.prototype.getInitialContacts = function(cb) {
    var self = this;

    setTimeout(function() {
        self.initialComplete = true;
        if (cb) {
            return cb();
        }
    }, 3);
};


// addContact prototype function


// getContact prototype function


// deleteContact prototype function
