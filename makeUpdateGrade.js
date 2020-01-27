module.exports = function(column, value, studentIDs) {
  if (typeof value === 'number') {
    return `function makeUpdateGrade(column, value) {
      return function updateGrade(studentID) {
        $($('th:contains('+studentID+')')
          .closest('tr')
          .find('td')[column])
          .find('input')
          .first()
          .val(value);
      }
    }
    updateGrade = makeUpdateGrade(${column}, ${value});
    ` + studentIDs.map(id => `updateGrade("${id}"); `).join(`
    `);
  }
  
  let code = `function makeUpdateGrade(column) {
    return function updateGrade(studentID, value) {
      $($('th:contains('+studentID+')')
        .closest('tr')
        .find('td')[column])
        .find('input')
        .first()
        .val(value);
    }
  }
  updateGrade = makeUpdateGrade(${column});
  `;
  
  for (let i = 0; i < studentIDs.length; i++) {
    code += `updateGrade("${studentIDs[i]}", ${value[i]}); 
    `
  }
  return code;
}

