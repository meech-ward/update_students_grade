const parse = require('csv-parse/lib/sync');
const fs = require('fs');

function parseQuizCSV(filePath) {
  
  const fileText = fs.readFileSync(filePath);
  
  const parsed = parse(fileText, {
    columns: true,
    skip_empty_lines: true
  });
  
  const users = parsed.map(user => ({
      id: user['Org Defined ID'],
      answer: user.Answer,
      name: `${user.FirstName} ${user.LastName}`,
      username: user.Username,
      question: user['Q #'],
      questionTitle: user['Q Text'], 
      outOf: user['Out Of'],
      difficulty: user.Difficulty,
      bonus: user['Bonus?'],
  }));

  return users;
}
module.exports = parseQuizCSV;