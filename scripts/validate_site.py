#!/usr/bin/env python3
"""Validate the generated Jekyll site without depending on a live server."""

from __future__ import annotations

import argparse
from pathlib import Path
from urllib.parse import unquote, urlsplit

from lxml import html


IGNORED_SCHEMES = {"data", "javascript", "mailto", "tel"}


def target_exists(site: Path, page: Path, value: str) -> bool:
    parsed = urlsplit(value)
    if parsed.scheme in IGNORED_SCHEMES or parsed.scheme or parsed.netloc:
        return True
    if not parsed.path:
        return True

    path = unquote(parsed.path)
    candidate = site / path.lstrip("/") if path.startswith("/") else page.parent / path
    candidates = [candidate]
    if path.endswith("/"):
        candidates.append(candidate / "index.html")
    elif not candidate.suffix:
        candidates.extend((candidate.with_suffix(".html"), candidate / "index.html"))
    return any(item.exists() for item in candidates)


def accessible_name(element) -> str:
    return " ".join(
        filter(
            None,
            (
                element.get("aria-label", "").strip(),
                element.get("title", "").strip(),
                " ".join(element.itertext()).strip(),
            ),
        )
    )


def validate(site: Path) -> list[str]:
    errors: list[str] = []
    pages = sorted(site.rglob("*.html"))
    for page in pages:
        relative = page.relative_to(site).as_posix()
        try:
            document = html.fromstring(page.read_bytes())
        except Exception as exc:  # pragma: no cover - diagnostic path
            errors.append(f"{relative}: invalid HTML ({exc})")
            continue

        ids = [value for value in document.xpath("//*[@id]/@id") if value]
        duplicates = sorted({value for value in ids if ids.count(value) > 1})
        if duplicates:
            errors.append(f"{relative}: duplicate ids: {', '.join(duplicates)}")

        for image in document.xpath("//img[not(@alt)]"):
            errors.append(f"{relative}: image without alt: {image.get('src', '<unknown>')}")

        for button in document.xpath("//button"):
            if not accessible_name(button):
                errors.append(f"{relative}: button without an accessible name")

        for element, attribute in (
            ("a", "href"),
            ("img", "src"),
            ("script", "src"),
            ("link", "href"),
            ("iframe", "src"),
            ("object", "data"),
        ):
            for node in document.xpath(f"//{element}[@{attribute}]"):
                value = node.get(attribute, "").strip()
                if value and not target_exists(site, page, value):
                    errors.append(f"{relative}: missing target {value}")

    print(f"Validated {len(pages)} generated HTML files.")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("site", nargs="?", type=Path, default=Path("_site"))
    args = parser.parse_args()
    errors = validate(args.site.resolve())
    if errors:
        print("\n".join(errors))
        return 1
    print("Internal targets, image alternatives, button names, and IDs: PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
