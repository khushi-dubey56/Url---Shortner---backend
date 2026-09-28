const URL =  require("../modules/url")
const { nanoid } = require('nanoid');
const User = require("../modules/user");


async function handleGenerateShortId(req , res) {
  const id = nanoid(10)
  const realurl = req.body
  
  if(!realurl.url ){
    return res.json({msg : "url is required"})
  }
 if (!realurl.url.startsWith("http://") && !realurl.url.startsWith("https://")) {
  return res.json({msg: "the url is not valid"})
}
  const shorturl = await URL.create({
    userId : req.decodedData.id,
    url : realurl.url,
    short : id
  })
  return res.json({msg : "shortUrl"  ,  shorturl})

}

async function handleGetallShortId(req , res) {
 
  if(req.decodedData.role ==="admin" ){
    const allShortUrl = await URL.find({}).select('url short -_id')
    return res.json({msg : "allShortUrls" , allShortUrl})
  }
  else{
     const allShortUrl = await URL.find({userId : req.decodedData.id}).select('url short -_id ')
     return res.json({msg : "allShortUrls" , allShortUrl})
     }
  } 


async function handleOriginalUrl(req , res) {
  const Ourl = req.params.shorturl
  
  const realurl = await URL.findOne({short : Ourl})
  if(!realurl){
    return res.json({msg : "short url not found"})
  }
  return res.redirect(realurl.url)

}

module.exports = {handleGenerateShortId , handleGetallShortId , handleOriginalUrl}




//"email": "dubey@emaple.com",
//
//