module.exports = function(column, value, studentIDs) {
  return `function makeUpdateGrade(column, value) {
    return function updateGrade(studentID) {
      $($('th:contains('+studentID+')')
        .closest('tr')
        .find('td')[2])
        .find('input')
        .first()
        .val(value);
    }
  }
  updateGrade = makeUpdateGrade(${column}, ${value});
  ` + studentIDs.map(id => `updateGrade("${id}"); `).join('');
}

