#!/usr/bin/env python3
"""Optimize product photos — no auto-splitting; custom crops for social screenshots."""

import json
from pathlib import Path

from PIL import Image, ImageOps, ImageEnhance

DOWNLOADS = Path("/Users/onurtastan/Downloads")
OUT = Path("/Users/onurtastan/ebbers-solutions/assets/images/products")
THUMBS = OUT / "thumbs"

SOURCES = [
    ("IMG_5997.JPG", "Ijzeren frame in de werkplaats Neede"),
    ("4891bdab-ee82-446f-a9e1-720d5f751109.JPG", "Eettafel met zwart ijzeren frame en zes houten stoelen"),
    ("6ca13825-2bb9-49a1-9dbb-3c123d143c36.JPG", "Detail: X-poot tafel met hout en zwart staal"),
    ("6d3b48eb-627a-47b0-bdca-fdb70206fe31.JPG", "Geometrisch ijzeren stoelframe"),
    ("8a098060-1362-46d6-bf71-f21631b61a01.JPG", "Eettafel met live-edge houten blad en gebogen metalen poot"),
    ("91434850-21a2-44f0-8f81-235c63a2ed0a.JPG", "Handgemaakte ijzeren kruk met houten zitting"),
    ("aa115802-a157-4d4e-b652-4142b5f351f3.JPG", "Industriële stoel met geperforeerde rugleuning"),
    ("b74f81bc-3dd5-4deb-9ad6-e934ddb1c968.JPG", "Design bijzettafel met geometrische uitsparingen"),
    ("d6463d1d-7ebc-4e30-ab7b-7cdfb64e376f.JPG", "Metalen tafelpoot met hexagon design"),
    ("f4bc8d97-e29e-4990-96d0-9b202c1598d3.JPG", "Vier metalen onderstellen — overzicht collectie"),
    ("148e777b-5e70-452d-9259-10f709889017.JPG", "Gelast metalen tafelonderstel met rasterpatroon"),
    ("3b87cf0f-4cf4-4d4f-96d5-e41fa7ee7b35.JPG", "Kettingtafel — industrieel design"),
    ("9def7368-6868-4fc6-99f5-5a671b4e0f74.JPG", "Handgemaakt ijzeren meubelwerk"),
    ("c9e8aac3-cbd6-4487-bd1c-046b1e892c65.JPG", "Handgemaakt ijzeren meubelwerk"),
    ("9933c5ef-b302-45c2-a050-1b98f890d9a7.JPG", "Werkplaats met stalen rekken en houten planken"),
    ("e9880caa-799b-445e-becc-abee26cf1f9c.JPG", "Houten stoel met ijzeren frame in de werkplaats"),
]

# left, top, right, bottom (0–1) — verwijdert Instagram UI + "4 jaar sinds..." overlay
CUSTOM_CROPS = {
    "9933c5ef-b302-45c2-a050-1b98f890d9a7.JPG": (0.03, 0.24, 0.97, 0.54),
}

MAX_WIDTH = 1920
THUMB_WIDTH = 640
JPEG_QUALITY = 88


def enhance(img: Image.Image) -> Image.Image:
    img = ImageOps.exif_transpose(img)
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")
    img = ImageEnhance.Contrast(img).enhance(1.05)
    img = ImageEnhance.Color(img).enhance(1.03)
    img = ImageEnhance.Sharpness(img).enhance(1.1)
    return img


def apply_custom_crop(img: Image.Image, src_name: str) -> Image.Image:
    if src_name not in CUSTOM_CROPS:
        return img
    l, t, r, b = CUSTOM_CROPS[src_name]
    w, h = img.size
    return img.crop((int(l * w), int(t * h), int(r * w), int(b * h)))


def resize(img: Image.Image, max_width: int) -> Image.Image:
    if img.width <= max_width:
        return img
    ratio = max_width / img.width
    return img.resize((max_width, int(img.height * ratio)), Image.Resampling.LANCZOS)


def save_web(img: Image.Image, path: Path, quality: int = JPEG_QUALITY) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "JPEG", quality=quality, optimize=True, progressive=True)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    THUMBS.mkdir(parents=True, exist_ok=True)

    for old in OUT.glob("product-*.jpg"):
        old.unlink()
    for old in THUMBS.glob("product-*.jpg"):
        old.unlink()

    manifest = []

    for index, (src_name, alt) in enumerate(SOURCES, start=1):
        src = DOWNLOADS / src_name
        if not src.exists():
            continue

        img = enhance(Image.open(src))
        img = apply_custom_crop(img, src_name)
        img = resize(img, MAX_WIDTH)

        name = f"product-{index:02d}.jpg"
        save_web(img, OUT / name)
        save_web(resize(img, THUMB_WIDTH), THUMBS / name, quality=82)

        manifest.append({
            "id": f"product-{index}",
            "src": f"assets/images/products/{name}",
            "thumb": f"assets/images/products/thumbs/{name}",
            "alt": alt,
        })

    with open(OUT / "manifest.json", "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print(f"Processed {len(manifest)} images (geen splitsing)")


if __name__ == "__main__":
    main()