import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string; // informando apenas que a chave é uma string do tipo string, sem passar nome predefinindo
}

// função para tratar os errors de formulario do SignUp;
export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });

  return validationErrors;
}
