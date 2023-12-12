const express = require("express");
const app = express();
const port = 8080;
// const { logger } = require("./logger");
const logger =require('./logger1')



app.get("/testetes", (req, res) => {
   try {
    logger.info("Hello Winston!");
    res.json({
      message:'asdsadasdadasd asdsa'
    });
   } catch (error) {
    res.json({
        message:error.message
      });
   }
  });
  

app.get("/", (req, res) => {
  res.json({
    message:'hello world'
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
