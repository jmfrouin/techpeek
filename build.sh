#!/bin/bash

# Script de build pour TechPeek Extension
echo "🔨 Building TechPeek Extension..."

# Créer le dossier de build
BUILD_DIR="build"
rm -rf $BUILD_DIR
mkdir -p $BUILD_DIR

echo "📁 Copying files..."

# Copier les fichiers essentiels
cp manifest.json $BUILD_DIR/
cp -r popup/ $BUILD_DIR/
cp -r content/ $BUILD_DIR/
cp -r background/ $BUILD_DIR/
cp -r injected/ $BUILD_DIR/
cp -r icons/ $BUILD_DIR/

# Copier la documentation
cp README.md $BUILD_DIR/
cp LICENSE $BUILD_DIR/

echo "🧹 Cleaning up development files..."

# Supprimer les fichiers de développement
rm -f $BUILD_DIR/create_icons.html
rm -f $BUILD_DIR/test.html
rm -f $BUILD_DIR/DEVELOPMENT.md
rm -f $BUILD_DIR/build.sh
rm -f $BUILD_DIR/icons/README.md
rm -f $BUILD_DIR/icons/*.svg

echo "📦 Creating distribution packages..."

# Créer un ZIP pour Chrome Web Store
cd $BUILD_DIR
zip -r ../techpeek-chrome.zip . -x "*.DS_Store" "*.git*"
cd ..

# Créer un ZIP pour Firefox Add-ons
cp $BUILD_DIR/techpeek-chrome.zip techpeek-firefox.zip

echo "✅ Build completed!"
echo "📦 Chrome package: techpeek-chrome.zip"
echo "📦 Firefox package: techpeek-firefox.zip"
echo "📁 Build directory: $BUILD_DIR/"

# Afficher la taille des packages
echo ""
echo "📊 Package sizes:"
ls -lh techpeek-*.zip

echo ""
echo "🚀 Ready for distribution!"
echo "   Chrome Web Store: Upload techpeek-chrome.zip"
echo "   Firefox Add-ons: Upload techpeek-firefox.zip" 