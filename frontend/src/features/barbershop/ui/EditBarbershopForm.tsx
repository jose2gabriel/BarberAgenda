import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../../../shared/ui/Input'
import { Button } from '../../../shared/ui/Button'
import { ErrorMessage } from '../../../shared/ui/ErrorMessage'
import { SuccessMessage } from '../../../shared/ui/SuccessMessage'
import { ApiError } from '../../../shared/lib/api'
import type { Barbershop } from '../../../entities/barbershop/types'

const editBarbershopSchema = z.object({
  name: z.string().min(3, 'Nome da barbearia deve ter pelo menos 3 caracteres'),
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  phone: z.string().min(10, 'Telefone inválido'),
})

type EditBarbershopFormData = z.infer<typeof editBarbershopSchema>

interface EditBarbershopFormProps {
  barbershop: Barbershop
  onUpdate: (dados: EditBarbershopFormData) => Promise<Barbershop>
}

export function EditBarbershopForm({ barbershop, onUpdate }: EditBarbershopFormProps) {
  const [sucesso, setSucesso] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EditBarbershopFormData>({
    resolver: zodResolver(editBarbershopSchema),
    defaultValues: {
      name: barbershop.name,
      address: barbershop.address,
      phone: barbershop.phone,
    },
  })

  async function onSubmit(dados: EditBarbershopFormData) {
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
      <Input label="Nome da barbearia" error={errors.name?.message} {...register('name')} />
      <Input label="Endereço" error={errors.address?.message} {...register('address')} />
      <Input label="Telefone" error={errors.phone?.message} {...register('phone')} />

      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
      {sucesso && <SuccessMessage>Barbearia atualizada com sucesso.</SuccessMessage>}

      <Button type="submit" loading={isSubmitting} className="w-full justify-center">
        Salvar alterações
      </Button>
    </form>
  )
}
