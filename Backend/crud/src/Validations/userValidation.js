const yup = require("yup");
const valBr = require("validations-br");
const hasLogin = require("../Querry/index");

const userSchema = yup.object({
  Nome: yup.string().required(),
  login: yup.string().required(),
  CPF: yup
    .string()
    .test("is cpf", "CPF invalido", (value) => valBr.validateCPF(value)),
  Email: yup.string().email().required(),
  AgentCode: yup
    .string()
    .required()
    .test("Digits only", "AgentCode deve conter somente digitos", (value) =>
      /^\d+$/.test(value)
    )
    .min(6)
    .max(6),
});

module.exports = userSchema;
