#!/bin/bash

REPO="shubhamku044/la-resume"

declare -A labels=(
  # Status Labels
  ["needs triage"]="D93F0B 🔴 New issues that need initial review"
  ["in progress"]="FBCA04 🟡 Actively being worked on"
  ["resolved"]="0E8A16 🟢 Completed/Resolved issues"
  ["on hold"]="0052CC 🔵 Paused/waiting for external factors"
  ["blocked"]="000000 ⚫ Blocked by other issues/dependencies"
  ["needs reproduction"]="C5DEF5 🟣 Requires reproduction steps"

  # Issue Type Labels
  ["bug"]="D73A4A 🐛 Confirmed bug reports"
  ["enhancement"]="84B6EB ✨ New features or improvements"
  ["documentation"]="0075CA 📚 Documentation-related tasks"
  ["refactor"]="FFD700 🔧 Code refactoring needs"
  ["testing"]="FEF2C0 🧪 Test-related work"
  ["UX/UI"]="BFDADC 🧠 Design/user experience improvements"
  ["performance"]="5319E7 🚀 Performance optimization work"
  ["security"]="EE0701 🔒 Security-related issues"

  # Priority Labels
  ["priority: critical"]="B60205 🚨 Highest priority issues"
  ["priority: high"]="FF9F1C ⚠️ Important but not critical"
  ["priority: medium"]="FEF2C0 📌 Normal priority"
  ["priority: low"]="D4C5F9 🗓 Low priority/backlog items"

  # Area Labels
  ["area: templates"]="7057FF 📄 Related to resume templates"
  ["area: export"]="006B75 📤 PDF/LaTeX export functionality"
  ["area: ATS"]="1D76DB 🤖 ATS compatibility features"
  ["area: config"]="F9D0C4 ⚙️ Configuration-related code"

  # Technology Labels
  ["tech: nextjs"]="000000 ⚡ Next.js framework related"
  ["tech: typescript"]="3178C6 📦 TypeScript-specific code"
  ["tech: tailwind"]="06B6D4 🎨 Tailwind CSS-related code"
  ["tech: latex"]="008080 📄 LaTeX template engine code"

  # Special Labels
  ["good first issue"]="7057FF 👋 Good for new contributors"
  ["help wanted"]="008672 🆘 Extra attention needed"
  ["hacktoberfest"]="FF7518 🏁 Suitable for Hacktoberfest contributors"
  ["milestone"]="FEF2C0 🎉 Issues tied to specific milestones"
)

for label in "${!labels[@]}"; do
  color="${labels[$label]%% *}"      # Extract the color
  description="${labels[$label]#* }" # Extract the emoji and description

  gh api repos/$REPO/labels \
    -X POST \
    -F name="$label" \
    -F color="$color" \
    -F description="$description"

  echo "Created label: $label"
done
