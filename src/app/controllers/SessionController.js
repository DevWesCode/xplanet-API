import * as Yup from "yup";
import User from "../models/User";
import authConfig from "../../config/auth";
const jwt = require("jsonwebtoken"); //erro ao usar o import

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(request.body);

    const emailOrPasswordIncorrect = () =>
      response
        .status(401)
        .json({ error: "Seu Email ou Senha estão incorretos." });

    if (!isValid) {
      return emailOrPasswordIncorrect();
    }

    const { email, password } = request.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return emailOrPasswordIncorrect();
    }

    const isSamePassword = await user.comparePassword(password);

    if (!isSamePassword) {
      return emailOrPasswordIncorrect();
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return response.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email,
        admin: user.admin,
      },
      token,
    });
  }
}

export default new SessionController();
