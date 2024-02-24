import { createUser } from "../managers/userManager.js";

async function signupController(req, res, next) {
  const { firstName, lastName, email, password,  address, phoneNumber} = req.body;
  const user = await createUser(firstName, lastName, email, password, address, phoneNumber);

}
async function loginController(req, res, next) {
  // Extract the username and password from the request body
  const { username, password } = req.body;

}

exports = {loginController};
