import jsonwebtoken from "jsonwebtoken";
import authConfig from "../config/auth";

function authMiddleware(request, response, next) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: "Token não fornecido" });
  }

  const token = authToken.split(" ").at(1);

  try {
    const decoded = jsonwebtoken.verify(token, authConfig.secret);
    request.userId = decoded.id;

    return next();
  } catch (err) {
    return response.status(401).json({ error: "Token inválido" });
  }
}

export default authMiddleware;
