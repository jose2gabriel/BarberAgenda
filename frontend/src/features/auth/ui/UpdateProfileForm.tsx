import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../../../shared/ui/Input'
import { Button } from '../../../shared/ui/Button'
import { ErrorMessage } from '../../../shared/ui/ErrorMessage'
import { SuccessMessage } from '../../../shared/ui/SuccessMessage'
import { ApiError } from '../../../shared/lib/api'
import type { Usuario } from '../../../entities/usuario/types'

const updateProfileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(150),
  phone: z.string().min(10, 'Telefone inválido').max(20),
})

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>

interface UpdateProfileFormProps {
  user: Usuario
  onUpdate: (dados: UpdateProfileFormData) => Promise<unknown>
}

export function UpdateProfileForm({ user, onUpdate }: UpdateProfileFormProps) {
  const [sucesso, setSucesso] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: user.name, phone: user.phone },
  })

  async function onSubmit(dados: UpdateProfileFormData) {
    setSucesso(false)
    try {
      await onUpdate(dados)
      setSucesso(true)
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Não foi possível atualizar. Tente novamente.'
      setError('root', { message })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Nome" error={errors.name?.message} {...register('name')} />
      <Input label="Telefone" error={errors.phone?.message} {...register('phone')} />

      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
      {sucesso && <SuccessMessage>Dados atualizados com sucesso.</SuccessMessage>}

      <Button type="submit" loading={isSubmitting} className="w-full justify-center">
        Salvar alterações
      </Button>
    </form>
  )
}
