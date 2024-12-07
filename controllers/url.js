const shortid = require("shortid");
const URL=require('../modules/url');

async function handlegenrateNewShortURL(req, res) {
const body=req.body;
if (!body.url) {
    return res.status(400).json({error:'url is required'})
}

  const shortID = nanoid(8);
  await URL.create({
    shortID:shortID,
    redirectURL:body.url,
    visitHistory:[],
  })
  return res.json({id:shortID})
}

module.exports={
    handlegenrateNewShortURL,
}