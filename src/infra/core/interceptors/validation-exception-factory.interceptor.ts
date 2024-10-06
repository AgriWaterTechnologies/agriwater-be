import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

interface ValidationErrorReason {
  property: string;
  messages: string[];
}

export const ValidationExceptionFactory = (
  validationErrors: ValidationError[] = [],
) => {
  const errors: ValidationErrorReason[] = [];
  /**
   * Valida todos os objetos aninhados da requisição recursivamente
   */
  const buildNestedErrors = (
    error: ValidationError,
    parentProperty: string,
  ) => {
    /* Designa o nome da propriedade de acordo com o objeto */
    const property = parentProperty
      ? `${parentProperty}.${error.property}`
      : error.property;

    /* Verifica se é um erro base do objeto (sem aninhamento) */
    if (error.constraints) {
      Object.entries(error.constraints).forEach(([, value]) => {
        const errFound = errors.findIndex((err) => err.property === property);

        /* 
          Se já existir um erro da mesma propriedade
          apenas adiciona uma nova mensagem ao erro
        */
        if (errFound > -1) {
          errors[errFound].messages.push(value);
          return;
        }
        /*
          Se for um erro que ainda não existe
          adiciona um novo erro ao array
        */
        errors.push({
          property: property,
          messages: [value],
        });
      });
    }

    /* Verifica se existem objetos aninhados para serem validados */
    if (error.children && error.children.length > 0) {
      error.children.forEach((child) => {
        buildNestedErrors(child, property);
      });
    }

    return errors;
  };

  /* Itera sobre todos os erros retornados do class-validator */
  validationErrors.forEach((error) => {
    buildNestedErrors(error, '');
  });

  /* Retorna o erro padrão com status 422 (UNPROCESSABLE_ENTITY) */
  return new UnprocessableEntityException({
    name: 'Validation Error',
    module: getErrorTargetName(validationErrors),
    code: 'IN.REQ-VAL.E-0001',
    message:
      'Não foi possível validar os dados da requisição. Verifique os campos informados e tente novamente.',
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    errors,
  });
};

/**
 * Atribui o nome do objeto que contém o erro à propriedade module
 */
const getErrorTargetName = (errors: ValidationError[]) => {
  const error = errors[0];
  if (error.children && error.children.length > 0) {
    return getErrorTargetName(error.children);
  }
  return error.target.constructor.name;
};
