import { Router } from 'express'
import { UsuarioController } from '../controllers/UsuarioController'
import { validate } from '../../../shared/middlewares/validate'
import { autenticar } from '../../../shared/middlewares/autenticar'
import { cadastroSchema, loginSchema, atualizacaoSchema } from '../schemas/UsuarioSchema'

/** Monta-se em app.use('/auth', routerAuth(controller)) */
export function routerAuth(controller: UsuarioController) {
  const router = Router()

  // RF001 — Cadastro de usuário
  router.post('/register', validate(cadastroSchema), (req, res, next) =>
    controller.cadastrar(req, res, next)
  )

  // RF002 — Autenticação (rate limit dedicado contra força bruta, security-guide.md)
  router.post('/login', validate(loginSchema), (req, res, next) =>
    controller.login(req, res, next)
  )

  // RF018 — Encerramento de sessão (client-side no MVP, ver usuarios.md)
  router.post('/logout', autenticar, (req, res, next) =>
    controller.logout(req, res, next)
  )

  return router
}

/** Monta-se em app.use('/users', routerUsers(controller)) */
export function routerUsers(controller: UsuarioController) {
  const router = Router()

  // RF019 + RF017 — exige token válido
  router.get('/me', autenticar, (req, res, next) =>
    controller.me(req, res, next)
  )

  // RF019 — Atualização de dados (nome, telefone, senha)
  router.patch('/me', autenticar, validate(atualizacaoSchema), (req, res, next) =>
    controller.atualizar(req, res, next)
  )

  return router
}
