# Storage — Barber Agenda

## Configuração

O Barber Agenda usa o **Supabase Storage** para armazenar imagens de barbearias, profissionais e serviços.

### Bucket

| Nome | Tipo | Uso |
|------|------|-----|
| `avatars` | Public | Fotos de barbearias, profissionais e serviços |

> O bucket é **público** — as URLs das imagens são acessíveis sem autenticação. O controle de quem pode fazer upload é feito pelo backend via `SUPABASE_SERVICE_ROLE_KEY`.

### Como criar o bucket no Supabase

1. Acessa **Storage** no menu lateral
2. Clica em **New bucket**
3. Nome: `avatars`
4. Marca como **Public**
5. Clica em **Save**

---

## Restrições de Upload

| Regra | Valor |
|-------|-------|
| Formatos aceitos | JPG, PNG, WebP |
| Tamanho máximo | 2MB |

---

## Estrutura de Paths no Bucket

```
avatars/
├── users/{user_id}.jpg
├── barbershops/{barbershop_id}.jpg
├── professionals/{professional_id}.jpg
└── services/{service_id}.jpg
```

O `upsert: true` garante que ao enviar nova foto, a anterior é substituída automaticamente.

---

## Serviço de Upload

O upload é centralizado em `src/shared/storage/storageService.ts`:

```typescript
import { supabase } from '../database/supabase'

export async function uploadImagem(
  bucket: string,
  path: string,
  file: Express.Multer.File
): Promise<string> {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    })

  if (error) throw new Error(`Erro ao fazer upload: ${error.message}`)

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
```

---

## Middleware de Upload (Multer)

Configurado em `src/shared/middlewares/upload.ts`:

```typescript
import multer from 'multer'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 2 * 1024 * 1024 // 2MB

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return cb(new Error('Formato inválido. Use JPG, PNG ou WebP.'))
    }
    cb(null, true)
  },
})
```

---

## Uso nos Routers

```typescript
// Exemplo: atualizar foto de uma barbearia
router.patch(
  '/:id/avatar',
  autenticar,
  upload.single('avatar'),    // multer processa o arquivo
  BarbershopController.updateAvatar
)
```

---

## Tabelas que usam avatar_url

| Tabela | Campo | Obrigatório |
|--------|-------|-------------|
| `users` | `avatar_url` | Não |
| `barbershops` | `avatar_url` | Não |
| `professionals` | `avatar_url` | Não |
| `services` | `avatar_url` | Não |

O campo `avatar_url` armazena a URL pública retornada pelo Supabase Storage após o upload.


