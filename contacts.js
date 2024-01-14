const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contactsData);
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getContactById(contactId) {
  try {
    const contactsData = await listContacts();
    const result = await contactsData.find((item) => item.id === contactId);
    return result || null;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
try {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  const [result] = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
} catch (error) {
console.log(error);
}
}

// removeContact("rsKkOQUi80UsgVPCcLZZW");

async function addContact(name, email, phone) {
try {
    const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
} catch (error) {
  console.log(error);
}
}

module.exports = { listContacts, getContactById, removeContact, addContact };
