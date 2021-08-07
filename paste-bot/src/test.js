client.on("message", async (message) => {
  console.log(message.content);
  if (message.content.toLowerCase() === "!deploy") {
  }
});
