// AddressBook.js Solution
function AddressBook() {
    this.contacts = [];
    this.initialComplete = false;
}

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

AddressBook.prototype.addContact = function(contact) {
    this.contacts.push(contact);
};

AddressBook.prototype.getContact = function(index) {
    return this.contacts[index];
};

AddressBook.prototype.deleteContact = function(index) {
    this.contacts.splice(index, 1);
};



// ==================================== AddressBookSpec.js Solution ====================================

describe('Address Book', function() {
    var addressBook;
    var thisContact;

    beforeEach(function() {
        addressBook = new AddressBook();
        thisContact = new Contact();
    });

    // Testing Address Book to be able to add contact and get contact
    it('Should be able to add a contact', function() {
        addressBook.addContact(thisContact);

        expect(addressBook.getContact(0)).toBe(thisContact);
    });

    // Testing Address Book to be able to delete contact
    it('Should be able to delete a contact', function() {
        addressBook.addContact(thisContact);
        addressBook.deleteContact(0);

        expect(addressBook.deleteContact(0)).not.toBeDefined();
    });
});


// Async Address Book function test
describe('Async Address Book', function() {
    var addressBook = new AddressBook();

    beforeEach(function(done) {
        addressBook.getInitialContacts(function() {
            done();
        });
    });

    // Testing Async Grab initial contacts
    it('Should grab initial contacts', function(done) {
        addressBook.getInitialContacts();

        expect(addressBook.initialComplete).toBe(true);
        done();
    });
});
