#!/bin/bash

# Check if running in CircleCI environment
if [ "$CIRCLECI" = "true" ]; then
    echo "Detected CircleCI environment."
    # In CircleCI, BASH_ENV is predefined. No need to create a temp file.
else
    # Define and initialize BASH_ENV for local use
    export BASH_ENV=$(mktemp)
    echo "Not in CircleCI. Using BASH_ENV at $BASH_ENV for local execution."
fi

# Specify the directory containing the JSON templates
template_dir=".circleci/slack-notifications/templates"
echo "Starting to process JSON templates in directory: $template_dir"

# Check if the template directory exists
if [ -d "$template_dir" ]; then
  # Loop through each JSON file in the directory
  for file in "${template_dir}"/*.json; do
    # Extract the filename without the path and .json extension to use as the variable name
    filename=$(basename -- "$file")
    varname="${filename%.*}"

    echo "Processing file: $filename"

    # Read the content of the JSON file
    content=$(cat "$file")

    # Export the content as an environment variable and append the command to $BASH_ENV
    echo "export ${varname}='$(echo $content)'" >> $BASH_ENV
    echo "Exported ${varname} to BASH_ENV"
  done
  echo "Finished processing all JSON templates."
else
  echo "Template directory not found: $template_dir"
fi


echo "Contents of BASH_ENV:"
cat $BASH_ENV