#!/bin/bash

# Lighthouse Test Runner
# Reads projects_run.json and executes lighthouse tests for all projects

# Check if projects_run.json exists
if [ ! -f "projects_run.json" ]; then
    echo "Error: projects_run.json not found in current directory"
    exit 1
fi

# Check if lighthouse is installed
if ! command -v lighthouse &> /dev/null; then
    echo "Error: lighthouse is not installed"
    echo "Install it with: npm install -g lighthouse"
    exit 1
fi

# Check if jq is installed (for JSON parsing)
if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed"
    echo "Install it with: brew install jq"
    exit 1
fi

echo "Starting Lighthouse tests..."
echo "================================"

# Read the JSON file and process each project
jq -c '.[]' projects_run.json | while read -r project; do
    # Extract values from JSON
    url=$(echo "$project" | jq -r '.url')
    name=$(echo "$project" | jq -r '.name')
    type=$(echo "$project" | jq -r '.type')
    
    echo ""
    echo "Testing: $name"
    echo "URL: $url"
    echo "Type: $type"
    echo "--------------------------------"
    
    # Run lighthouse test
    lighthouse "$url" \
        --output=json \
        --output-path="./reports/${type}/${name}.json" \
        --quiet \
        --chrome-flags="--headless"
    
    if [ $? -eq 0 ]; then
        echo "Saved the report to ./${type}/${name}.json"
        echo "✓ Test completed for $name"
    else
        echo "✗ Test failed for $name"
    fi
done

echo ""
echo "================================"
echo "All tests completed!"