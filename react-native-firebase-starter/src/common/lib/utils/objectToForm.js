import snakeCase from 'snake-case'

const objectToFormData = function(obj, form, namespace) {
  var fd = form || new FormData()
  var formKey

  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = namespace + '[' + snakeCase(property) + ']'
      } else {
        formKey = snakeCase(property)
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        objectToFormData(obj[property], fd, formKey)
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property])
      }
    }
  }

  return fd
}
export default objectToFormData
