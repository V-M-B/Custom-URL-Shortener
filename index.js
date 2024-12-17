const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB Connected")
);

// middleware
app.use(express.json());

app.use("/url", urlRoute);

// to create dynamic route
app.get("/:shortId", async (req, res) => {
    try {
      const shortId = req.params.shortId;
  
      // Find the entry by shortId
      const entry = await URL.findOne({ shortId });
  
      if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
      }
  
      // Update visit history
      entry.visitHistory.push({ timestamp: Date.now() });
      await entry.save(); // Save the updated document
  
      // Redirect to the original URL
      res.redirect(entry.redirectURL);
    } catch (error) {
      console.error("Error in dynamic route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
