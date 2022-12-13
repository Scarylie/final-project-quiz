
// vet inte om denna bör vara här, men något sådant när en loggat in och ser sina quizes
app.get("/globes/id/:id", async (req, res) => {
    try {
      const award = await Globe.findById(req.params.id)
      if (award) {
      res.json(award);
     } else {
      res.status(404).json({ error: 'Award not found' })
     }
  } catch (err) {
     res.status(400).json({ error: 'Invalid award id' })
   }
  });