const validate = (schema) => async (req, res, next) => {
  try {
      console.log('Request Body:', req.body); // Log request body
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      return next();
  } catch (err) {
      console.error('Validation Error:', err.issues); // Log validation errors
      const status = 422;
      const message = "Fill the input properly";
      const extraDetails = err.issues.map((curElem) => curElem.message);

      const error = {
          status,
          message,
          extraDetails,
      };

      next(error);
  }
};

module.exports = validate;
