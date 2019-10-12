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
      name: user.FirstName,
      question: user['Q #'],
      questionTitle: user['Q Title'], 
  }));

  return users;
}
module.exports = parseQuizCSV;