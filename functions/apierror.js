function createError(id, code, title, details) {
    let error = {
      "id": id,
      "code": code,
      "title": title,
      "detail": details,
    }
  
    return error;
  }

function createInvalidCode(fieldName)  {
   return `${fieldName}-Invalid`;
}

module.exports.createError = createError;
module.exports.createInvalidCode = createInvalidCode;