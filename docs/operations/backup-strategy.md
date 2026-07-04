# Estratégia de Backup

## Banco de Dados (PostgreSQL/Supabase)

O Supabase realiza backups automáticos diários no plano gratuito (RNF008).

- **Frequência:** diária
- **Retenção:** 7 dias (plano gratuito)
- **Responsabilidade:** gerenciada pela infraestrutura do Supabase

## Código-Fonte

- Versionado no GitHub com histórico completo de commits
- Branch `main` representa sempre o estado estável em produção
- Branch `develop` representa a integração contínua

## Restauração

Em caso de necessidade de restauração do banco:
1. Acesse o painel do Supabase
2. Vá em **Database → Backups**
3. Selecione o ponto de restauração desejado
4. Confirme a restauração (ação irreversível no ambiente atual)

> ⚠️ Comunique o time antes de qualquer restauração em produção.
