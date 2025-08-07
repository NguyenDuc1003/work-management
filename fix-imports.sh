#!/bin/bash

echo "🔧 Fixing all import paths from @/ to relative paths..."

# Function to fix imports in a file
fix_imports() {
    local file="$1"
    local depth="$2"
    
    echo "Fixing $file..."
    
    # Replace @/components/ui/ with relative path to ui components
    sed -i '' "s|@/components/ui/|${depth}ui/|g" "$file"
    
    # Replace @/components/ with relative path to components
    sed -i '' "s|@/components/|${depth}|g" "$file"
    
    # Replace @/lib/ with relative path to lib
    sed -i '' "s|@/lib/|${depth}../lib/|g" "$file"
}

# Fix main component files (they import from ./ui/)
fix_imports "src/components/task-board.jsx" "./"
fix_imports "src/components/employee-management.jsx" "./"
fix_imports "src/components/department-management.jsx" "./"
fix_imports "src/components/project-management.jsx" "./"
fix_imports "src/components/settings.jsx" "./"
fix_imports "src/components/personal-tasks.jsx" "./"
fix_imports "src/components/chat-room.jsx" "./"
fix_imports "src/components/header.jsx" "./"

# Fix UI components (they import from ../../lib/)
fix_imports "src/components/ui/input.jsx" "../../"
fix_imports "src/components/ui/textarea.jsx" "../../"
fix_imports "src/components/ui/label.jsx" "../../"

echo "✅ All import paths fixed!"
