const yup = require("yup");

const userSchema = yup.object({
    Nome: yup.string().required(),
    login: yup.string().required(),
    CPF:yup.string(),
    Email:yup.string().email().required(),
    AgentCode:yup.string().min(4).required(),
    
});

module.exports = userSchema;
