#!/bin/bash

# WhiteDizajn Push Script
# Tento skript slúži na pushnutie WhiteDizajn branchu na GitHub

echo "🚨 Pushnutie WhiteDizajn branchu na GitHub"
echo "=========================================="
echo ""
echo "📋 Informácie o commite:"
git log --oneline -2
echo ""
echo "🌳 Aktuálny branch:"
git branch
echo ""
echo "⚠️  Poznámka: Keďže SSH nie je dostupné, potrebujete manuálne pushnuť"
echo "   Toto sú inštrukcie:"
echo ""
echo "1. Otvorte terminál/Command Prompt na vašom lokálnom počítači"
echo "2. Clone repozitár (ak ešte nemáte):"
echo "   git clone https://github.com/lusur1982/ZAI_workspace.git"
echo "   cd ZAI_workspace"
echo ""
echo "3. Checkout WhiteDizajn branch:"
echo "   git checkout WhiteDizajn"
echo ""
echo "4. Pull najnovšie zmeny (ak existujú):"
echo "   git pull origin WhiteDizajn"
echo ""
echo "5. Pushnite zmeny na GitHub:"
echo "   git push origin WhiteDizajn"
echo ""
echo "🎯 Po pushnutí bude WhiteDizajn dostupný na:"
echo "   https://github.com/lusur1982/ZAI_workspace/tree/WhiteDizajn"
echo ""
echo "✅ WhiteDizajn branch je pripravený na pushnutie!"
echo "   Obsahuje biely dizajn pre CM Crypto Miners projekt."