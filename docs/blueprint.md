# **App Name**: PageSpeed Insights Overview

## Core Features:

- Report Parsing: Recursively scan a directory structure to identify and parse JSON files representing PageSpeed Insights reports.
- Data Extraction: Extract key metrics (Performance, Accessibility, Best Practices, SEO scores) from the parsed reports using keys like categories.performance.score.
- Score Color-Coding: Implement a color-coding system (green, orange, red) based on predefined score ranges for each metric.
- Data Aggregation: Group extracted data by the 'TYPE' (e.g., TYPO3, Magento, WordPress) derived from the directory structure.
- Tabular Display: Present the aggregated and color-coded data in a table format, with rows representing projects and columns representing the metrics.

## Style Guidelines:

- Primary color: Soft blue (#A0CFEC) to provide a sense of calmness and clarity in viewing performance data.
- Background color: Very light gray (#F0F0F0) to ensure readability and a clean presentation.
- Accent color: Yellowish-green (#B7D363) to bring attention to important elements of the UI.
- Body and headline font: 'Inter', a grotesque-style sans-serif font, for a modern and neutral feel suitable for data presentation.
- Use simple, geometric icons to represent the different performance metrics (Performance, Accessibility, etc.).
- Use a clean, tabular layout with clear column headers and consistent spacing to facilitate easy data scanning.
- Subtle transition effects when loading and updating data in the table.