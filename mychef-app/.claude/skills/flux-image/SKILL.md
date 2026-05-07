# FLUX Image Generation

Generate images using Black Forest Labs (BFL) FLUX models. Optimizes outputs to WebP for the website.

## Usage

```bash
node scripts/generate-flux-image.js "prompt" [width] [height] [seed]
```

### Examples

```bash
# Default 1024x768
node scripts/generate-flux-image.js "A Mediterranean dinner table at sunset, Bali villa"

# Custom size
node scripts/generate-flux-image.js "Fresh seafood platter on marble" 1280 720

# Fixed seed for reproducibility
node scripts/generate-flux-image.js "Chef plating pasta by candlelight" 1024 768 42
```

## Environment Variables

Add to `.env.local` (never commit):

```bash
BFL_API_KEY=your_key_here
BFL_API_BASE_URL=https://api.bfl.ai
BFL_DEFAULT_ENDPOINT=/v1/flux-2-klein-9b
```

## Output

| File | Location | Purpose |
|------|----------|---------|
| Raw image | `public/images/generated/` | Archive/original |
| Optimized WebP | `public/images/` | Use on website |

## Workflow

1. **Generate** → raw saved to `public/images/generated/`
2. **Optimize** → `cwebp` converts to `public/images/*.webp`
3. **Use** → reference as `/images/filename.webp` in components

## Safety

- API key is read from `.env.local` only
- Key is **never logged, printed, or committed**
- `.env.local` is in `.gitignore`
- The script exits immediately if `BFL_API_KEY` is missing
