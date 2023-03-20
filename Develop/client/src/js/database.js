import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const contactDb = await openDB("editor", 1);

  const tx = contactDb.transaction("editor", "readwrite");

  const store = tx.objectStore("editor");

  await store.clear();
  const request = await store.add({ content: content });
  console.log("🚀 - data saved to the database", request);
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const contactDb = await openDB("editor", 1);

  const tx = contactDb.transaction("editor", "readonly");

  const store = tx.objectStore("editor");

  const request = await store.getAll();
  return request.content;
};

initdb();
