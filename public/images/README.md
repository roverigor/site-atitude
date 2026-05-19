# Imagens do site

Estrutura de pastas + convenção de nomes para deixar tudo rápido de manter.

## Pastas

```
public/images/
├── graduations/             # Fotos de formatura (todas as turmas)
│   ├── raw/                 # 📦 Joga aqui as fotos cruas do drive
│   └── 2024/, 2025/...      # Após curar, mover para subpasta por ano
├── students/                # Avatares de alunos para depoimentos
└── courses/                 # Imagens de destaque dos cursos (uma por curso)
```

## Como subir as fotos do drive

1. **Despeja tudo em `public/images/graduations/raw/`** — pode arrastar a pasta inteira do drive aqui, sem preocupação com nome.
2. Quando der tempo, **renomeia e separa por ano** seguindo o padrão abaixo.
3. As fotos em `raw/` **não vão pro site automaticamente** — só ficam disponíveis quando você listar elas em `src/data/graduations.yaml`.

## Convenção de nomes

| Pasta | Padrão | Exemplo |
|---|---|---|
| `graduations/2024/` | `formatura-{categoria}-{nn}.webp` | `formatura-informatica-01.webp` |
| `students/` | `{nome-do-aluno}.webp` | `maria-aparecida.webp` |
| `courses/` | `{slug-do-curso}.webp` | `assistente-administrativo.webp` |

`{nn}` = número sequencial 2 dígitos (`01`, `02`, …).

## Formato recomendado

- **WebP** (mais leve que JPG, suportado em 95%+ dos browsers atuais).
- **Largura máxima 1600px** para fotos de formatura (galeria); 800px para avatares.
- **Qualidade 80-85%** — invisível pro olho, metade do tamanho.

### Como converter rápido

Se as fotos vierem em JPG/PNG do drive, converte em lote no terminal:

```bash
# Requer imagemagick: sudo apt install imagemagick
cd public/images/graduations/raw
for f in *.{jpg,jpeg,png,JPG,JPEG,PNG}; do
  [ -f "$f" ] || continue
  convert "$f" -resize "1600x>" -quality 82 "${f%.*}.webp"
done
```

Ou online em https://squoosh.app (drag-and-drop, sem instalar nada).

## Como o site consome

- **`src/data/graduations.yaml`** lista eventos de formatura com `fotos: [...]` apontando pros paths em `/images/graduations/`. A página `/formaturas` lê esse YAML.
- **`src/data/testimonials.yaml`** tem `foto:` em cada aluno → `/images/students/`. Aparece em `/depoimentos` e no carrossel da home.
- **`src/data/courses/*.yaml`** tem `imagem_destaque:` → `/images/courses/`. Mostrado no card e na página detalhe do curso.
