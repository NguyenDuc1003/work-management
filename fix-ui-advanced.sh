#!/bin/bash

# Advanced script to fix all remaining JSX issues
cd /Users/mac/Downloads/work-management-system/src/components/ui

# Fix broken forwardRef syntax
for file in *.jsx; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."
    
    # Fix broken lines that start with >
    sed -i '' '/^>(/c\
(({ className, ...props }, ref) => (' "$file"
    
    # Remove export interface declarations
    sed -i '' '/^export interface/d' "$file"
    
    # Remove standalone interface declarations
    sed -i '' '/^interface [^{]*{/d' "$file"
    
    # Remove type annotations in parameters
    sed -i '' 's/: [A-Za-z<>|&\[\]{}., ]*//g' "$file"
    
    # Fix any remaining TypeScript syntax
    sed -i '' 's/<[^>]*>//g' "$file" 2>/dev/null || true
    
    echo "Fixed $file"
  fi
done

echo "All UI components fixed!"
