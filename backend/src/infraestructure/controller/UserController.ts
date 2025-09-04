import { Request, Response } from "express";
import { UserApplicationService } from "../../application/UserApplicationService";
import { User } from "../../domain/User";
import { NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from "../../utils/RegexUtils";

export class UserController {
  private app: UserApplicationService;

  constructor(app: UserApplicationService) {
    this.app = app;
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ error: "Email y contraseña son requeridos" });

      // Validación de email
      if (!EMAIL_REGEX.test(email))
        return res.status(400).json({ error: "Correo electrónico no válido" });

      // Validación de contraseña
      if (!PASSWORD_REGEX.test(password))
        return res.status(400).json({
          error:
            "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
        });

      const token = await this.app.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  }

  async registerUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    try {
      // Validaciones usando expresiones regulares importadas
      if (!NAME_REGEX.test(name.trim()))
        return res.status(400).json({ message: "Error en dato" });
      if (!EMAIL_REGEX.test(email))
        return res.status(400).json({ error: "Correo electrónico no válido" });
      if (!PASSWORD_REGEX.test(password))
        return res.status(400).json({
          error:
            "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
        });

      const status = 1;
      const user: Omit<User, "id"> = {
        tipoEntidad: req.body.tipoEntidad || "Individual",
        nombreEntidad: name,
        correo: email,
        password,
        estado: status,
      };
      const userId = await this.app.createUser(user);
      return res
        .status(201)
        .json({ message: "Usuario registrado correctamente", userId });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.app.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Error en parámetro" });
      }
      const user = await this.app.getUserById(id);
      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getUserByIdQuery(req: Request, res: Response): Promise<Response> {
    try {
      const idParam = req.query.id as string;
      const id = parseInt(idParam);
      if (!idParam || isNaN(id)) {
        return res.status(400).json({ message: "Query param 'id' inválido" });
      }
      const user = await this.app.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const email: string = req.params.email;
      if (!email) {
        return res.status(400).json({ message: "Error en el parámetro" });
      }
      const user = await this.app.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getUserByEmailQuery(req: Request, res: Response): Promise<Response> {
    try {
      const email = req.query.email as string;
      if (!email) {
        return res.status(400).json({ message: "Query param 'email' es requerido" });
      }
      const user = await this.app.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Error en parámetro" });
      }
      const deleted = await this.app.deleteUserById(id);
      if (!deleted) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.status(200).json({ message: "Usuario dado de baja exitosamente" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async deleteUserQuery(req: Request, res: Response): Promise<Response> {
    try {
      const idParam = req.query.id as string;
      const id = parseInt(idParam);
      if (!idParam || isNaN(id)) {
        return res.status(400).json({ message: "Query param 'id' inválido" });
      }
      const deleted = await this.app.deleteUserById(id);
      if (!deleted) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.status(200).json({ message: "Usuario dado de baja exitosamente" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Error en parámetro" });
      }

      let { name, email, password, status } = req.body;

      // Validaciones antes de actualizar
      if (name && !/^[a-zA-Z\s]{3,}$/.test(name.trim()))
        return res.status(400).json({
          message: "El nombre debe tener al menos 3 caracteres y solo contener letras",
        });

      if (email && !EMAIL_REGEX.test(email.trim()))
        return res.status(400).json({ message: "Correo electrónico no válido" });

      if (password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password.trim()))
        return res.status(400).json({
          message:
            "La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra y un número",
        });

      // Forzar status por defecto y mapear "name" a "nombreEntidad"
      status = 1;
      const updated = await this.app.updateUser(id, {
        nombreEntidad: name,
        correo: email,
        password,
        estado: status,
      });
      if (!updated) {
        return res.status(404).json({
          message: "Usuario no encontrado o error al actualizar",
        });
      }
      return res.status(200).json({ message: "Usuario actualizado con éxito" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}