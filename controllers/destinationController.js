const Destination = require("../models/destination");

let lastIndex = -1;

const getDestination = async (req, res) => {
    try {
      const count = await Destination.countDocuments();
      if (count === 0) {
        return res.status(404).json({ message: "No destinations found" });
      }
  
      // Get the next destination in sequence
      lastIndex = (lastIndex + 1) % count;
      const correctDestination = await Destination.findOne()
        .skip(lastIndex)
        .select("alias clues name -_id");
  
      if (!correctDestination) {
        return res.status(404).json({ message: "No destinations found" });
      }
  
      // Get 3 incorrect destinations
      const incorrectDestinations = await Destination.aggregate([
        { $match: { name: { $ne: correctDestination.name } } },
        { $sample: { size: 3 } }, // Randomly pick 3 wrong answers
        { $project: { name: 1, _id: 0 } }
      ]);
  
      // Combine correct and incorrect answers
      let options = [correctDestination.name, ...incorrectDestinations.map(dest => dest.name)]
  
      // Shuffle the options randomly
      options.sort(() => Math.random() - 0.5);
  
      res.json({
        alias: correctDestination.alias,
        clues: correctDestination.clues,
        options
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };


const checkDestination = async (req, res) => {
  try {
    const { userInput, alias } = req.body;

    if (!userInput || !alias) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the destination by alias
    const destination = await Destination.findOne({ alias });

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    // Compare the user input with the actual name (case insensitive)
    const isCorrect = destination.name.toLowerCase() === userInput.toLowerCase();

    res.json({ correct: isCorrect,trivia : destination.funFacts });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getDestination, checkDestination };
