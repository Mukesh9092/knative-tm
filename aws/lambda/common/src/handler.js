async function justWait() {
  return new Promise((resolve, reject) => setTimeout(resolve, 100));
}

module.exports.sayHelloAsync = async (event) => {
  await justWait();
  return {hellodhirendra: event && event.name || "Missing a name property in the event's JSON body"};
};
