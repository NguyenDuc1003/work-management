#!/bin/bash

# Script to fix TypeScript syntax in JSX files
cd /Users/mac/Downloads/work-management-system/src/components/ui

# List of files to fix
files=(
  "dialog.jsx"
  "select.jsx" 
  "progress.jsx"
  "tabs.jsx"
  "switch.jsx"
  "dropdown-menu.jsx"
  "button.jsx"
  "card.jsx"
  "badge.jsx"
  "alert.jsx"
  "avatar.jsx"
  "separator.jsx"
  "skeleton.jsx"
  "checkbox.jsx"
  "radio-group.jsx"
  "slider.jsx"
  "toast.jsx"
  "tooltip.jsx"
  "popover.jsx"
  "hover-card.jsx"
  "sheet.jsx"
  "drawer.jsx"
  "command.jsx"
  "context-menu.jsx"
  "menubar.jsx"
  "navigation-menu.jsx"
  "breadcrumb.jsx"
  "pagination.jsx"
  "scroll-area.jsx"
  "accordion.jsx"
  "collapsible.jsx"
  "alert-dialog.jsx"
  "form.jsx"
  "calendar.jsx"
  "aspect-ratio.jsx"
  "carousel.jsx"
  "chart.jsx"
  "input-otp.jsx"
  "resizable.jsx"
  "sonner.jsx"
  "table.jsx"
  "toggle.jsx"
  "toggle-group.jsx"
  "use-mobile.jsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."
    
    # Remove TypeScript forwardRef syntax
    sed -i '' 's/React\.forwardRef<[^>]*>/React.forwardRef/g' "$file"
    
    # Remove TypeScript type imports
    sed -i '' 's/, type [^}]*}/ }/g' "$file"
    sed -i '' 's/{ type [^,]*, /{ /g' "$file"
    sed -i '' 's/import { type /import { /g' "$file"
    
    # Remove lines with React.ComponentProps and React.ElementRef
    sed -i '' '/React\.ComponentProps/d' "$file"
    sed -i '' '/React\.ElementRef/d' "$file"
    
    # Remove HTMLElement types
    sed -i '' '/HTMLInputElement,/d' "$file"
    sed -i '' '/HTMLTextAreaElement,/d' "$file"
    sed -i '' '/HTMLButtonElement,/d' "$file"
    sed -i '' '/HTMLDivElement,/d' "$file"
    
    # Remove VariantProps lines
    sed -i '' '/VariantProps</d' "$file"
    
    # Fix interface syntax to be JSX compatible
    sed -i '' 's/interface [^{]*{//g' "$file"
    sed -i '' 's/\?://g' "$file"
    
    echo "Fixed $file"
  fi
done

echo "All files processed!"
