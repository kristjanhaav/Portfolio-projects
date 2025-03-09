// Structured categories with predefined messages
const messageCategories = {
    astrology: [
      "Today, the stars align in your favor!",
      "Beware of the full moon—adventure awaits!",
      "Venus will bring harmony into your relationships.",
      "Mars empowers you with courage today.",
      "A surprise encounter will change your perspective."
    ],
    inspirational: [
      "Believe you can, and you're halfway there.",
      "Every day is a fresh start.",
      "Your potential is limitless—keep pushing forward!",
      "Small steps lead to great achievements.",
      "Dream big, act bigger."
    ],
    nonsensicalJokes: [
      "Why did the invisible man turn down the job offer? He couldn't see himself doing it.",
      "What's orange and sounds like a parrot? A carrot!",
      "Why don't skeletons fight each other? They don't have the guts.",
      "I told my computer I needed a break, and now it won't stop sending me vacation ads!",
      "Why did the tomato turn red? Because it saw the salad dressing!"
    ]
  };
  
  const readline = require('readline');
  
  // Function to select a random element from an array
  function randomElement(arr) {
    if (!arr.length) {
      throw new Error("Cannot select from an empty array.");
    }
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  // Generate and output a random message from a random category
  function generateRandomMessage() {
    const categories = Object.keys(messageCategories);
    const randomCategory = randomElement(categories);
  
    if (!messageCategories[randomCategory].length) {
      throw new Error(`The category \"${randomCategory}\" has no messages.`);
    }
  
    const message = randomElement(messageCategories[randomCategory]);
    return { category: randomCategory, message };
  }
  
  // Main execution function using readline
  function runMessageGenerator() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    function promptUser() {
      try {
        const result = generateRandomMessage();
        console.log(`\nCategory: ${result.category.toUpperCase()}\nMessage: ${result.message}\n`);
      } catch (error) {
        console.error(error.message);
        rl.close();
        return;
      }
  
      rl.question("Generate another message? (yes/no): ", (answer) => {
        if (answer.toLowerCase() === 'yes') {
          promptUser();
        } else {
          console.log("Thanks for using the Random Message Generator!");
          rl.close();
        }
      });
    }
  
    promptUser();
  }
  
  // Unit Tests
  function runUnitTests() {
    console.log("\nRunning unit tests...\n");
  
    // Test randomElement
    function testRandomElement() {
      const arr = [1, 2, 3];
      const result = randomElement(arr);
      if (!arr.includes(result)) {
        throw new Error("randomElement failed to select an element from array.");
      }
    }
  
    // Test generateRandomMessage
    function testGenerateRandomMessage() {
      const result = generateRandomMessage();
      if (!messageCategories[result.category].includes(result.message)) {
        throw new Error("generateRandomMessage produced invalid output.");
      }
    }
  
    // Edge case: empty category
    function testEmptyCategory() {
      const backup = messageCategories.astrology;
      messageCategories.astrology = [];
  
      let threwError = false;
      try {
        generateRandomMessage();
      } catch (error) {
        threwError = true;
        console.log("✅ Passed empty category edge case test.");
      } finally {
        messageCategories.astrology = backup;
      }
  
      if (!threwError) {
        throw new Error("Empty category test failed: No error was thrown.");
      }
    }
  
    testRandomElement();
    testGenerateRandomMessage();
    testEmptyCategory();
  
    console.log("All unit tests passed successfully!\n");
  }
  
  // Uncomment to run unit tests:
  // runUnitTests();
  
  // Execute the main function
  runMessageGenerator();
  
  