#!/bin/bash

# 1. Pytamy o wersję i opis na samym początku
echo "🏷️ Podaj nową wersję (np. 1.0.9):"
read VERSION
echo "📝 Podaj opis zmian (commit message):"
read MESSAGE

# 2. Aktualizacja wersji w package.json (bez tworzenia tagu przez npm)
echo "🆙 Aktualizacja wersji w package.json..."
npm version $VERSION --no-git-tag-version

# 3. Kompilacja
echo "🚀 Budowanie projektu (Rollup)..."
if npm run build; then
    echo "✅ Kompilacja udana."
else
    echo "❌ BŁĄD KOMPILACJI! Przerywam."
    exit 1
fi

# 4. Git Add & Commit
echo "📦 Dodawanie zmian do Git..."
git add .
git commit -m "$MESSAGE (v$VERSION)"

# 5. Push kodu i tworzenie tagu Git
echo "☁️ Wysyłanie do GitHub..."
if git push origin main && git tag "v$VERSION" && git push origin "v$VERSION"; then
    echo "✅ Sukces! Wersja v$VERSION opublikowana."
else
    echo "❌ Błąd wysyłania do GitHuba!"
    exit 1
fi